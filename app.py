from flask import Flask, jsonify, send_from_directory, abort, request, session
from functools import wraps
import json
import os
import re
import shutil
import secrets
from werkzeug.security import check_password_hash
from werkzeug.utils import secure_filename

app = Flask(__name__, static_folder="public")

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PUBLIC_DIR = os.path.join(BASE_DIR, "public")
MD_FOLDER = os.path.join(BASE_DIR, "on_tap")
ENV_FILE = os.path.join(BASE_DIR, ".env")
USERS_FILE = os.path.join(BASE_DIR, "users.json")


def load_env_file(env_path):
    if not os.path.isfile(env_path):
        return

    with open(env_path, "r", encoding="utf-8") as env_file:
        for raw_line in env_file:
            line = raw_line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue

            key, value = line.split("=", 1)
            key = key.strip()
            value = value.strip().strip('"').strip("'")
            if key and key not in os.environ:
                os.environ[key] = value


def ensure_md_folder():
    os.makedirs(MD_FOLDER, exist_ok=True)


def resolve_on_tap_path(relative_path):
    normalized = os.path.normpath((relative_path or "").strip())
    if normalized in {".", ""}:
        return os.path.abspath(MD_FOLDER)

    if normalized.startswith("..") or os.path.isabs(normalized):
        abort(400)

    file_path = os.path.abspath(os.path.join(MD_FOLDER, normalized))
    md_root = os.path.abspath(MD_FOLDER)
    if os.path.commonpath([file_path, md_root]) != md_root:
        abort(400)

    return file_path


def resolve_md_path(filename):
    normalized = os.path.normpath(filename)
    if not normalized.endswith(".md"):
        abort(400)

    return resolve_on_tap_path(normalized)


def natural_sort_key(value):
    return [
        int(part) if part.isdigit() else part.lower()
        for part in re.split(r"(\d+)", value)
    ]


def is_valid_folder_name(name):
    return bool(name) and not any(char in name for char in '<>:"/\\|?*')


def is_valid_document_name(name):
    return bool(re.fullmatch(r"[\w\-. ]+\.md", name, re.IGNORECASE))


def load_users():
    if not os.path.isfile(USERS_FILE):
        return []

    with open(USERS_FILE, "r", encoding="utf-8") as users_file:
        payload = json.load(users_file)

    users = payload.get("users", [])
    return users if isinstance(users, list) else []


def find_user_by_email(email):
    normalized_email = (email or "").strip().lower()
    for user in load_users():
        if str(user.get("email", "")).strip().lower() == normalized_email:
            return user
    return None


def current_user():
    user_email = session.get("user_email")
    if not user_email:
        return None
    return find_user_by_email(user_email)


def is_admin():
    user = current_user()
    return bool(user and user.get("role") == "admin")


def require_admin(view_func):
    @wraps(view_func)
    def wrapped(*args, **kwargs):
        if not is_admin():
            return jsonify({"error": "Ban can dang nhap voi quyen admin"}), 403
        return view_func(*args, **kwargs)

    return wrapped


def auth_payload():
    user = current_user()
    if not user:
        return {
            "authenticated": False,
            "role": None,
            "email": None
        }

    return {
        "authenticated": True,
        "role": user.get("role"),
        "email": user.get("email")
    }


def list_tree(root_path, relative_root=""):
    items = []
    with os.scandir(root_path) as entries:
        for entry in sorted(entries, key=lambda item: natural_sort_key(item.name)):
            rel_path = os.path.join(relative_root, entry.name).replace("\\", "/")
            if entry.is_dir():
                items.append({
                    "name": entry.name,
                    "path": rel_path,
                    "type": "folder",
                    "children": list_tree(entry.path, rel_path)
                })
            else:
                items.append({
                    "name": entry.name,
                    "path": rel_path,
                    "type": "file",
                    "editable": entry.name.lower().endswith(".md")
                })
    return items


ensure_md_folder()
load_env_file(ENV_FILE)
app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY", f"dev-{secrets.token_hex(16)}")
app.config["SESSION_COOKIE_SAMESITE"] = "Lax"


@app.route("/")
def index():
    return send_from_directory(PUBLIC_DIR, "content.html")


@app.route("/api/files")
def get_files():
    try:
        return jsonify(list_tree(MD_FOLDER))
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/file/<path:filename>")
def get_file(filename):
    file_path = resolve_md_path(filename)

    if not os.path.isfile(file_path):
        return abort(404)

    with open(file_path, "r", encoding="utf-8") as f:
        return f.read()


@app.route("/api/file/<path:filename>", methods=["PUT"])
@require_admin
def save_file(filename):
    file_path = resolve_md_path(filename)

    if not os.path.isfile(file_path):
        return abort(404)

    payload = request.get_json(silent=True) or {}
    content = payload.get("content")
    if not isinstance(content, str):
        return jsonify({"error": "Noi dung file khong hop le"}), 400

    with open(file_path, "w", encoding="utf-8", newline="\n") as f:
        f.write(content)

    return jsonify({"ok": True, "file": filename})


@app.route("/api/folder", methods=["POST"])
@require_admin
def create_folder():
    payload = request.get_json(silent=True) or {}
    parent = payload.get("parent", "")
    name = (payload.get("name") or "").strip()

    if not is_valid_folder_name(name):
        return jsonify({"error": "Ten thu muc khong hop le"}), 400

    parent_path = resolve_on_tap_path(parent)
    if not os.path.isdir(parent_path):
        return jsonify({"error": "Thu muc cha khong ton tai"}), 404

    folder_path = resolve_on_tap_path(os.path.join(parent, name))
    os.makedirs(folder_path, exist_ok=True)
    return jsonify({"ok": True, "path": os.path.relpath(folder_path, MD_FOLDER).replace("\\", "/")})


@app.route("/api/document", methods=["POST"])
@require_admin
def create_document():
    payload = request.get_json(silent=True) or {}
    parent = payload.get("parent", "")
    name = (payload.get("name") or "").strip()
    content = payload.get("content", "")

    if not name.lower().endswith(".md"):
        name = f"{name}.md"

    if not is_valid_document_name(name):
        return jsonify({"error": "Ten document khong hop le"}), 400

    parent_path = resolve_on_tap_path(parent)
    if not os.path.isdir(parent_path):
        return jsonify({"error": "Thu muc cha khong ton tai"}), 404

    file_path = resolve_md_path(os.path.join(parent, name))
    if os.path.exists(file_path):
        return jsonify({"error": "Document da ton tai"}), 409

    with open(file_path, "w", encoding="utf-8", newline="\n") as f:
        f.write(content if isinstance(content, str) else "")

    relative_path = os.path.relpath(file_path, MD_FOLDER).replace("\\", "/")
    return jsonify({"ok": True, "file": relative_path})


@app.route("/api/rename", methods=["POST"])
@require_admin
def rename_item():
    payload = request.get_json(silent=True) or {}
    source = payload.get("source", "")
    new_name = (payload.get("new_name") or "").strip()

    source_path = resolve_on_tap_path(source)
    if not source or not os.path.exists(source_path):
        return jsonify({"error": "Muc can doi ten khong ton tai"}), 404

    parent_relative = os.path.dirname(source).replace("\\", "/")
    parent_path = resolve_on_tap_path(parent_relative)

    if os.path.isdir(source_path):
        if not is_valid_folder_name(new_name):
            return jsonify({"error": "Ten thu muc khong hop le"}), 400
    else:
        if not new_name.lower().endswith(".md"):
            new_name = f"{new_name}.md"
        if not is_valid_document_name(new_name):
            return jsonify({"error": "Ten file khong hop le"}), 400

    destination_path = resolve_on_tap_path(os.path.join(parent_relative, new_name))
    if os.path.abspath(destination_path) == os.path.abspath(source_path):
        return jsonify({"ok": True, "path": source.replace("\\", "/")})

    if os.path.exists(destination_path):
        return jsonify({"error": "Da ton tai muc trung ten"}), 409

    os.rename(source_path, destination_path)
    relative_path = os.path.relpath(destination_path, MD_FOLDER).replace("\\", "/")
    return jsonify({"ok": True, "path": relative_path})


@app.route("/api/move", methods=["POST"])
@require_admin
def move_item():
    payload = request.get_json(silent=True) or {}
    source = payload.get("source", "")
    target_folder = payload.get("target_folder", "")

    source_path = resolve_on_tap_path(source)
    target_folder_path = resolve_on_tap_path(target_folder)

    if not source or not os.path.exists(source_path):
        return jsonify({"error": "File hoac thu muc nguon khong ton tai"}), 404

    if not os.path.isdir(target_folder_path):
        return jsonify({"error": "Thu muc dich khong ton tai"}), 404

    item_name = os.path.basename(source_path)
    destination_path = resolve_on_tap_path(os.path.join(target_folder, item_name))

    if os.path.abspath(source_path) == os.path.abspath(destination_path):
        return jsonify({"error": "Muc da nam san trong thu muc nay"}), 400

    if os.path.exists(destination_path):
        return jsonify({"error": "Thu muc dich da co muc trung ten"}), 409

    if os.path.isdir(source_path):
        source_abs = os.path.abspath(source_path)
        target_abs = os.path.abspath(target_folder_path)
        if target_abs == source_abs or target_abs.startswith(source_abs + os.sep):
            return jsonify({"error": "Khong the di chuyen thu muc vao chinh no"}), 400

    shutil.move(source_path, destination_path)
    relative_path = os.path.relpath(destination_path, MD_FOLDER).replace("\\", "/")
    return jsonify({"ok": True, "path": relative_path})


@app.route("/api/item/<path:item_path>", methods=["DELETE"])
@require_admin
def delete_item(item_path):
    target_path = resolve_on_tap_path(item_path)

    if not os.path.exists(target_path):
        return jsonify({"error": "Muc can xoa khong ton tai"}), 404

    if os.path.isdir(target_path):
        shutil.rmtree(target_path)
    else:
        os.remove(target_path)

    return jsonify({"ok": True, "path": item_path})


@app.route("/api/upload", methods=["POST"])
@require_admin
def upload_file():
    target = request.form.get("target", "")
    target_path = resolve_on_tap_path(target)
    if not os.path.isdir(target_path):
        return jsonify({"error": "Thu muc dich khong ton tai"}), 404

    uploaded_files = request.files.getlist("files")
    if not uploaded_files:
        return jsonify({"error": "Khong co file nao duoc gui len"}), 400

    saved = []
    for uploaded in uploaded_files:
        filename = secure_filename(uploaded.filename or "")
        if not filename:
            continue

        destination = resolve_on_tap_path(os.path.join(target, filename))
        uploaded.save(destination)
        saved.append(os.path.relpath(destination, MD_FOLDER).replace("\\", "/"))

    if not saved:
        return jsonify({"error": "Khong co file hop le de luu"}), 400

    return jsonify({"ok": True, "files": saved})


@app.route("/api/auth/status")
def auth_status():
    return jsonify(auth_payload())


@app.route("/api/login", methods=["POST"])
def login():
    payload = request.get_json(silent=True) or {}
    email = (payload.get("email") or "").strip()
    password = payload.get("password") or ""

    user = find_user_by_email(email)
    if not user or not check_password_hash(user.get("password_hash", ""), password):
        return jsonify({"error": "Email hoac mat khau khong dung"}), 401

    session["user_email"] = user.get("email")
    return jsonify({"ok": True, **auth_payload()})


@app.route("/api/logout", methods=["POST"])
def logout():
    session.pop("user_email", None)
    return jsonify({"ok": True, **auth_payload()})


@app.route("/docs/<path:filename>")
def get_uploaded_file(filename):
    file_path = resolve_on_tap_path(filename)
    if not os.path.isfile(file_path):
        return abort(404)

    relative_dir = os.path.relpath(os.path.dirname(file_path), MD_FOLDER)
    if relative_dir == ".":
        relative_dir = ""

    return send_from_directory(
        os.path.join(MD_FOLDER, relative_dir),
        os.path.basename(file_path),
        as_attachment=False
    )


@app.route("/<path:path>")
def static_files(path):
    return send_from_directory(PUBLIC_DIR, path)


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    debug = os.environ.get("FLASK_DEBUG", "").lower() in {"1", "true", "yes"}
    app.run(debug=debug, host="0.0.0.0", port=port)
