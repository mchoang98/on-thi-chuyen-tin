from flask import Flask, jsonify, send_from_directory, abort, request
import os
import re

app = Flask(__name__, static_folder="public")

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PUBLIC_DIR = os.path.join(BASE_DIR, "public")
MD_FOLDER = os.path.join(BASE_DIR, "on_tap")


def resolve_md_path(filename):
    normalized = os.path.normpath(filename)
    if (
        normalized.startswith("..")
        or os.path.isabs(normalized)
        or not normalized.endswith(".md")
    ):
        abort(400)

    file_path = os.path.abspath(os.path.join(MD_FOLDER, normalized))
    md_root = os.path.abspath(MD_FOLDER)
    if os.path.commonpath([file_path, md_root]) != md_root:
        abort(400)

    return file_path


def natural_sort_key(value):
    return [
        int(part) if part.isdigit() else part.lower()
        for part in re.split(r"(\d+)", value)
    ]


@app.route("/")
def index():
    return send_from_directory(PUBLIC_DIR, "content.html")


@app.route("/api/files")
def get_files():
    try:
        files = os.listdir(MD_FOLDER)
        md_files = sorted(
            (f for f in files if f.endswith(".md")),
            key=natural_sort_key
        )
        return jsonify(md_files)
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


@app.route("/<path:path>")
def static_files(path):
    return send_from_directory(PUBLIC_DIR, path)


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    debug = os.environ.get("FLASK_DEBUG", "").lower() in {"1", "true", "yes"}
    app.run(debug=debug, host="0.0.0.0", port=port)
