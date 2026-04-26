const basePath = "on_tap/";
let docsTree = [];
let flatFiles = [];
let currentIndex = -1;
let currentDocText = "";
let isEditing = false;
let draggedItemPath = "";
let expandedFolders = {};
let authState = {
  authenticated: false,
  email: null,
  role: null
};

const content = document.getElementById("content");
const navList = document.getElementById("navList");
const searchInput = document.getElementById("searchInput");
const breadcrumb = document.getElementById("breadcrumb");
const authInfo = document.getElementById("authInfo");
const authBtn = document.getElementById("authBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const sidebar = document.getElementById("sidebar");
const mobileToggle = document.getElementById("mobileToggle");
const editBtn = document.getElementById("editBtn");
const saveBtn = document.getElementById("saveBtn");
const cancelBtn = document.getElementById("cancelBtn");
const openFileBtn = document.getElementById("openFileBtn");
const moveBtn = document.getElementById("moveBtn");
const deleteBtn = document.getElementById("deleteBtn");
const editorPanel = document.getElementById("editorPanel");
const editorInput = document.getElementById("editorInput");
const serverBadge = document.getElementById("serverBadge");
const statusText = document.getElementById("statusText");
const newFolderBtn = document.getElementById("newFolderBtn");
const newDocBtn = document.getElementById("newDocBtn");
const dropHint = document.getElementById("dropHint");

init();

async function init() {
  try {
    renderServerBadge();
    await refreshAuthStatus();
    await refreshTree();

    const initialFile = getInitialFile();
    currentIndex = findIndexByFile(initialFile);

    if (currentIndex >= 0) {
      await loadDoc(currentIndex);
    } else {
      showEmptyState();
    }

    renderNav();
  } catch (error) {
    showError(`Khong the ket noi backend: ${error.message}`);
  }
}

function isAdmin() {
  return authState.authenticated && authState.role === "admin";
}

async function refreshAuthStatus() {
  const res = await fetch("/api/auth/status");
  if (!res.ok) {
    throw new Error(`API /api/auth/status loi ${res.status}`);
  }

  authState = await res.json();
  applyAuthUI();
}

function applyAuthUI() {
  const admin = isAdmin();
  authInfo.textContent = admin ? `${authState.email} (admin)` : "Khach";
  authBtn.textContent = authState.authenticated ? "Logout" : "Login";

  newFolderBtn.classList.toggle("hidden", !admin);
  newDocBtn.classList.toggle("hidden", !admin);
  dropHint.classList.toggle("hidden", !admin);
  moveBtn.classList.toggle("hidden", !admin);
  deleteBtn.classList.toggle("hidden", !admin);
  editBtn.classList.toggle("hidden", !admin || isEditing);

  if (!admin && isEditing) {
    exitEditMode();
    return;
  }

  updateControls();
}

function renderServerBadge() {
  const host = window.location.host || "unknown";
  const isLocal = /^(localhost|127\.0\.0\.1)(:\d+)?$/i.test(host);
  serverBadge.textContent = isLocal ? `LOCAL ${host}` : `REMOTE ${host}`;
  serverBadge.className = `server-badge ${isLocal ? "local" : "remote"}`;
}

async function refreshTree() {
  const res = await fetch("/api/files");
  if (!res.ok) {
    throw new Error(`API /api/files loi ${res.status}`);
  }

  const tree = await res.json();
  if (!Array.isArray(tree)) {
    throw new Error("Backend tra ve du lieu khong hop le");
  }

  docsTree = tree;
  flatFiles = flattenFiles(tree);
  flatFiles.sort((a, b) => a.path.localeCompare(b.path, undefined, { numeric: true, sensitivity: "base" }));
  syncExpandedFolders();
}

function flattenFiles(nodes, bucket = []) {
  nodes.forEach((node) => {
    const normalizedNode = normalizeNode(node);

    if (normalizedNode.type === "folder") {
      flattenFiles(normalizedNode.children || [], bucket);
      return;
    }

    bucket.push({
      path: normalizedNode.path,
      name: normalizedNode.name,
      title: normalizedNode.name.replace(/\.[^.]+$/, "").replaceAll("_", " "),
      editable: Boolean(normalizedNode.editable)
    });
  });

  return bucket;
}

function normalizeNode(node) {
  if (typeof node === "string") {
    const path = node;
    const parts = path.split("/");
    const name = parts[parts.length - 1] || path;
    return {
      path,
      name,
      type: "file",
      editable: name.toLowerCase().endsWith(".md")
    };
  }

  const path = typeof node?.path === "string" ? node.path : "";
  const parts = path.split("/").filter(Boolean);
  const fallbackName = parts[parts.length - 1] || "untitled";
  const name = typeof node?.name === "string" && node.name ? node.name : fallbackName;
  const type = node?.type === "folder" ? "folder" : "file";

  return {
    ...node,
    path,
    name,
    type,
    editable: typeof node?.editable === "boolean" ? node.editable : name.toLowerCase().endsWith(".md"),
    children: Array.isArray(node?.children) ? node.children : []
  };
}

async function fetchDocContent(file) {
  const res = await fetch(`/api/file/${encodePath(file)}`);
  if (!res.ok) {
    throw new Error(`API /api/file/${file} loi ${res.status}`);
  }
  return res.text();
}

function renderNav(filter = "") {
  navList.innerHTML = "";
  const keyword = filter.trim().toLowerCase();

  const fragment = document.createDocumentFragment();

  docsTree.forEach((node) => {
    const element = renderNode(node, keyword, 0);
    if (element) {
      fragment.appendChild(element);
    }
  });

  if (!fragment.childNodes.length) {
    const empty = document.createElement("div");
    empty.className = "nav-empty";
    empty.textContent = "Khong co tai lieu phu hop";
    navList.appendChild(empty);
    return;
  }

  navList.appendChild(fragment);
}

function renderNode(node, keyword, depth) {
  const normalizedNode = normalizeNode(node);
  const matchesSelf = normalizedNode.path.toLowerCase().includes(keyword)
    || normalizedNode.name.toLowerCase().includes(keyword);

  if (normalizedNode.type === "folder") {
    const isExpanded = keyword
      ? true
      : expandedFolders[normalizedNode.path] !== false;

    const children = (normalizedNode.children || [])
      .map((child) => renderNode(child, keyword, depth + 1))
      .filter(Boolean);

    if (keyword && !matchesSelf && children.length === 0) {
      return null;
    }

    const wrapper = document.createElement("div");
    wrapper.className = "nav-folder";

    const folderRow = document.createElement("div");
    folderRow.className = "nav-folder-row";
    folderRow.style.paddingLeft = `${depth * 16}px`;
    folderRow.dataset.folderPath = normalizedNode.path;
    folderRow.onclick = () => toggleFolder(normalizedNode.path);

    const folderToggle = document.createElement("span");
    folderToggle.className = "nav-folder-toggle";
    folderToggle.textContent = isExpanded ? "-" : "+";
    folderRow.appendChild(folderToggle);

    const folderLabel = document.createElement("span");
    folderLabel.className = "nav-folder-label";
    folderLabel.textContent = normalizedNode.name;
    folderRow.appendChild(folderLabel);

    const folderActions = document.createElement("div");
    folderActions.className = "nav-actions";
    if (isAdmin()) {
      const renameFolderBtn = createActionButton("Sua ten", async (event) => {
        event.stopPropagation();
        await promptRenameFolder(normalizedNode.path, normalizedNode.name);
      });

      const deleteFolderBtn = createActionButton("Xoa", async (event) => {
        event.stopPropagation();
        if (!window.confirm(`Xoa thu muc "${normalizedNode.name}" va toan bo noi dung ben trong?`)) {
          return;
        }

        await deleteItem(normalizedNode.path);
      });

      folderActions.appendChild(renameFolderBtn);
      folderActions.appendChild(deleteFolderBtn);
      folderRow.appendChild(folderActions);
    }

    attachDropTarget(folderRow, normalizedNode.path);

    const childWrap = document.createElement("div");
    childWrap.className = `nav-folder-children ${isExpanded ? "" : "hidden"}`.trim();
    children.forEach((child) => childWrap.appendChild(child));

    wrapper.appendChild(folderRow);
    wrapper.appendChild(childWrap);
    return wrapper;
  }

  if (keyword && !matchesSelf) {
    return null;
  }

  const index = findIndexByFile(normalizedNode.path);
  const row = document.createElement("div");
  row.className = "nav-file-row";
  row.style.paddingLeft = `${depth * 16}px`;
  row.draggable = isAdmin();
  row.dataset.itemPath = normalizedNode.path;

  row.addEventListener("dragstart", (event) => {
    if (!isAdmin()) {
      return;
    }
    draggedItemPath = normalizedNode.path;
    row.classList.add("is-dragging");
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", normalizedNode.path);
  });

  row.addEventListener("dragend", () => {
    draggedItemPath = "";
    row.classList.remove("is-dragging");
  });

  const button = document.createElement("button");
  button.type = "button";
  button.className = `nav-file ${index === currentIndex ? "active" : ""}`;
  button.textContent = normalizedNode.name;
  button.onclick = async () => {
    if (!(await confirmLeaveEditMode())) {
      return;
    }

    await loadDoc(index);
    closeMobileMenu();
  };
  row.appendChild(button);
  return row;
}

async function loadDoc(index) {
  const doc = flatFiles[index];
  if (!doc) {
    showEmptyState();
    return;
  }

  currentIndex = index;
  breadcrumb.textContent = basePath + doc.path;

  if (!doc.editable) {
    currentDocText = "";
    exitEditMode(false);
    content.innerHTML = `
      <div class="file-card">
        <h2>${escapeHtml(doc.name)}</h2>
        <p>File nay khong phai markdown nen khong sua truc tiep trong trinh duyet.</p>
        <p><a href="/docs/${encodePath(doc.path)}" target="_blank" rel="noreferrer">Mo hoac tai file</a></p>
      </div>
    `;
    setStatus("Dang xem file");
    updateControls();
    renderNav(searchInput.value);
    return;
  }

  currentDocText = await fetchDocContent(doc.path);
  await renderMarkdown(currentDocText);
  exitEditMode(false);
  setStatus("");
  updateControls();
  renderNav(searchInput.value);
}

async function renderMarkdown(md) {
  content.innerHTML = marked.parse(md);

  document.querySelectorAll("pre code").forEach((block) => {
    hljs.highlightElement(block);
  });

  if (window.MathJax) {
    MathJax.typesetClear([content]);
    await MathJax.typesetPromise([content]);
  }
}

async function saveCurrentDoc() {
  const doc = flatFiles[currentIndex];
  if (!doc || !doc.editable || !isAdmin()) {
    return;
  }

  setStatus("Dang luu...");

  const res = await fetch(`/api/file/${encodePath(doc.path)}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ content: editorInput.value })
  });

  if (!res.ok) {
    throw new Error(`Khong luu duoc file: ${res.status}`);
  }

  currentDocText = editorInput.value;
  await renderMarkdown(currentDocText);
  exitEditMode(false);
  setStatus("Da luu");
}

function updateControls() {
  const currentFile = flatFiles[currentIndex];
  const editable = Boolean(currentFile && currentFile.editable && isAdmin());
  const hasFiles = flatFiles.length > 0;
  const admin = isAdmin();

  prevBtn.disabled = !hasFiles || currentIndex <= 0;
  nextBtn.disabled = !hasFiles || currentIndex === flatFiles.length - 1;
  editBtn.disabled = !editable;
  moveBtn.disabled = !admin || !currentFile;
  deleteBtn.disabled = !admin || !currentFile;
  openFileBtn.classList.toggle("hidden", !currentFile || editable);
}

function getInitialFile() {
  const params = new URLSearchParams(window.location.search);
  return params.get("file") || getDefaultInitialFile();
}

function getDefaultInitialFile() {
  const firstTopLevelFolder = docsTree
    .map((node) => normalizeNode(node))
    .find((node) => node.type === "folder");

  if (firstTopLevelFolder) {
    const firstFolderFile = findFirstFileInNodes(firstTopLevelFolder.children || []);
    if (firstFolderFile) {
      return firstFolderFile.path;
    }
  }

  return flatFiles[0]?.path || "";
}

function findFirstFileInNodes(nodes) {
  for (const node of nodes) {
    const normalizedNode = normalizeNode(node);
    if (normalizedNode.type === "file") {
      return normalizedNode;
    }

    const nestedFile = findFirstFileInNodes(normalizedNode.children || []);
    if (nestedFile) {
      return nestedFile;
    }
  }

  return null;
}

function findIndexByFile(file) {
  return flatFiles.findIndex((doc) => doc.path === file);
}

function showEmptyState() {
  currentIndex = -1;
  content.innerHTML = `
    <div class="file-card">
      <h2>Chua co tai lieu</h2>
      <p>${isAdmin() ? "Ban co the tao document moi, tao thu muc, hoac keo tha file vao khung ben trai." : "Dang nhap admin de them, sua hoac xoa tai lieu."}</p>
    </div>
  `;
  breadcrumb.textContent = `${basePath}(rong)`;
  exitEditMode(false);
  setStatus("");
  updateControls();
}

function showError(message) {
  content.innerHTML = `<div class="error-box">${message}</div>`;
  breadcrumb.textContent = "Loi tai du lieu";
  setStatus("");
}

function enterEditMode() {
  isEditing = true;
  editorInput.value = currentDocText;
  editorPanel.classList.remove("hidden");
  content.classList.add("hidden");
  editBtn.classList.add("hidden");
  openFileBtn.classList.add("hidden");
  saveBtn.classList.remove("hidden");
  cancelBtn.classList.remove("hidden");
  setStatus("Dang chinh sua");
  editorInput.focus();
}

function exitEditMode(resetEditor = true) {
  isEditing = false;
  if (resetEditor) {
    editorInput.value = currentDocText;
  }
  editorPanel.classList.add("hidden");
  content.classList.remove("hidden");
  editBtn.classList.remove("hidden");
  saveBtn.classList.add("hidden");
  cancelBtn.classList.add("hidden");
  updateControls();
}

function setStatus(message) {
  statusText.textContent = message;
}

function closeMobileMenu() {
  sidebar.classList.remove("open");
}

async function confirmLeaveEditMode() {
  if (!isEditing) {
    return true;
  }

  if (editorInput.value === currentDocText) {
    exitEditMode(false);
    return true;
  }

  return window.confirm("Ban dang sua noi dung. Roi trang nay se mat thay doi chua luu, tiep tuc?");
}

function getSelectedFolderPath() {
  const currentFile = flatFiles[currentIndex];
  if (!currentFile) {
    return "";
  }

  const parts = currentFile.path.split("/");
  parts.pop();
  return parts.join("/");
}

function collectFolderPaths(nodes, bucket = []) {
  nodes.forEach((node) => {
    const normalizedNode = normalizeNode(node);
    if (normalizedNode.type !== "folder") {
      return;
    }

    bucket.push(normalizedNode.path);
    collectFolderPaths(normalizedNode.children || [], bucket);
  });

  return bucket;
}

function syncExpandedFolders() {
  const folderPaths = collectFolderPaths(docsTree);
  const firstTopLevelFolder = docsTree
    .map((node) => normalizeNode(node))
    .find((node) => node.type === "folder");
  const nextState = {};

  folderPaths.forEach((path) => {
    if (Object.prototype.hasOwnProperty.call(expandedFolders, path)) {
      nextState[path] = expandedFolders[path];
      return;
    }

    nextState[path] = Boolean(
      firstTopLevelFolder
      && (path === firstTopLevelFolder.path || path.startsWith(`${firstTopLevelFolder.path}/`))
    );
  });

  expandedFolders = nextState;
}

function toggleFolder(path) {
  expandedFolders[path] = !(expandedFolders[path] !== false);
  renderNav(searchInput.value);
}

async function createFolder() {
  if (!isAdmin()) {
    throw new Error("Chi admin moi co quyen tao thu muc");
  }
  const name = window.prompt("Nhap ten thu muc moi:");
  if (!name) {
    return;
  }

  const res = await fetch("/api/folder", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      parent: getSelectedFolderPath(),
      name
    })
  });

  if (!res.ok) {
    if (res.status === 404 || res.status === 405) {
      throw new Error("Backend chua cap nhat. Hay restart Flask hoac redeploy Render roi thu lai.");
    }
    const data = await safeJson(res);
    throw new Error(data.error || `Tao thu muc that bai: ${res.status}`);
  }

  await refreshTree();
  renderNav(searchInput.value);
  setStatus("Da tao thu muc");
}

async function createDocument() {
  if (!isAdmin()) {
    throw new Error("Chi admin moi co quyen tao document");
  }
  const name = window.prompt("Nhap ten document moi (.md):");
  if (!name) {
    return;
  }

  const res = await fetch("/api/document", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      parent: getSelectedFolderPath(),
      name,
      content: `# ${name.replace(/\.md$/i, "")}\n`
    })
  });

  const data = await safeJson(res);
  if (!res.ok) {
    if (res.status === 404 || res.status === 405) {
      throw new Error("Backend chua cap nhat. Hay restart Flask hoac redeploy Render roi thu lai.");
    }
    throw new Error(data.error || `Tao document that bai: ${res.status}`);
  }

  await refreshTree();
  currentIndex = findIndexByFile(data.file);
  await loadDoc(currentIndex);
  renderNav(searchInput.value);
  setStatus("Da tao document");
}

function createActionButton(label, handler) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "nav-action-btn";
  button.textContent = label;
  button.onclick = async (event) => {
    try {
      await handler(event);
    } catch (error) {
      setStatus(error.message);
    }
  };
  return button;
}

function attachDropTarget(element, targetPath) {
  ["dragenter", "dragover"].forEach((eventName) => {
    element.addEventListener(eventName, (event) => {
      event.preventDefault();
      element.classList.add("drag-over");
    });
  });

  ["dragleave", "dragend", "drop"].forEach((eventName) => {
    element.addEventListener(eventName, () => {
      element.classList.remove("drag-over");
    });
  });

  element.addEventListener("drop", async (event) => {
    event.preventDefault();
    try {
      if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
        await handleFileDrop(event.dataTransfer.files, targetPath);
        return;
      }

      const sourcePath = event.dataTransfer.getData("text/plain") || draggedItemPath;
      if (sourcePath) {
        await moveItem(sourcePath, targetPath);
      }
    } catch (error) {
      setStatus(error.message);
    }
  });
}

async function handleFileDrop(files, targetPath = "") {
  if (!isAdmin()) {
    throw new Error("Chi admin moi co quyen tai file");
  }
  if (!files || files.length === 0) {
    return;
  }

  const formData = new FormData();
  formData.append("target", targetPath);

  Array.from(files).forEach((file) => {
    formData.append("files", file);
  });

  setStatus("Dang tai file...");
  const res = await fetch("/api/upload", {
    method: "POST",
    body: formData
  });

  const data = await safeJson(res);
  if (!res.ok) {
    if (res.status === 404 || res.status === 405) {
      throw new Error("Backend chua cap nhat. Hay restart Flask hoac redeploy Render roi thu lai.");
    }
    throw new Error(data.error || `Tai file that bai: ${res.status}`);
  }

  await refreshTree();
  renderNav(searchInput.value);
  setStatus(`Da tai ${data.files.length} file`);
}

async function moveItem(sourcePath, targetFolder) {
  if (!isAdmin()) {
    throw new Error("Chi admin moi co quyen di chuyen");
  }
  const res = await fetch("/api/move", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      source: sourcePath,
      target_folder: targetFolder
    })
  });

  const data = await safeJson(res);
  if (!res.ok) {
    throw new Error(data.error || `Di chuyen that bai: ${res.status}`);
  }

  await refreshTree();
  currentIndex = findIndexByFile(data.path);
  if (currentIndex >= 0) {
    await loadDoc(currentIndex);
  } else {
    showEmptyState();
  }
  renderNav(searchInput.value);
  setStatus("Da di chuyen");
}

async function deleteItem(path) {
  if (!isAdmin()) {
    throw new Error("Chi admin moi co quyen xoa");
  }
  const res = await fetch(`/api/item/${encodePath(path)}`, {
    method: "DELETE"
  });

  const data = await safeJson(res);
  if (!res.ok) {
    throw new Error(data.error || `Xoa that bai: ${res.status}`);
  }

  const currentPath = flatFiles[currentIndex]?.path || "";
  const deletedCurrent = currentPath === path || currentPath.startsWith(`${path}/`);

  await refreshTree();

  if (deletedCurrent) {
    currentIndex = Math.min(currentIndex, flatFiles.length - 1);
    if (currentIndex >= 0) {
      await loadDoc(currentIndex);
    } else {
      showEmptyState();
    }
  } else {
    renderNav(searchInput.value);
    updateControls();
  }

  setStatus("Da xoa");
}

async function renameItem(sourcePath, newName) {
  if (!isAdmin()) {
    throw new Error("Chi admin moi co quyen doi ten");
  }
  const res = await fetch("/api/rename", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      source: sourcePath,
      new_name: newName
    })
  });

  const data = await safeJson(res);
  if (!res.ok) {
    throw new Error(data.error || `Doi ten that bai: ${res.status}`);
  }

  const currentPath = flatFiles[currentIndex]?.path || "";
  const renamedCurrent = currentPath === sourcePath || currentPath.startsWith(`${sourcePath}/`);

  await refreshTree();

  if (renamedCurrent) {
    const nextPath = currentPath === sourcePath
      ? data.path
      : currentPath.replace(sourcePath, data.path);
    currentIndex = findIndexByFile(nextPath);
    if (currentIndex >= 0) {
      await loadDoc(currentIndex);
    }
  } else {
    renderNav(searchInput.value);
    updateControls();
  }

  setStatus("Da doi ten");
}

async function promptRenameFolder(sourcePath, currentName) {
  const nextName = window.prompt("Nhap ten thu muc moi:", currentName);
  if (nextName === null) {
    return;
  }

  const trimmedName = nextName.trim();
  if (!trimmedName) {
    return;
  }

  await renameItem(sourcePath, trimmedName);
}

function listFolderPaths(nodes, bucket = [""]) {
  nodes.forEach((node) => {
    const normalizedNode = normalizeNode(node);
    if (normalizedNode.type !== "folder") {
      return;
    }

    bucket.push(normalizedNode.path);
    listFolderPaths(normalizedNode.children || [], bucket);
  });

  return bucket;
}

async function promptMoveItem(sourcePath) {
  const folders = listFolderPaths(docsTree);
  const message = [
    "Nhap thu muc dich de di chuyen.",
    "De trong de chuyen ve thu muc goc on_tap.",
    "",
    "Cac thu muc hien co:",
    ...folders.map((folder) => folder || "(goc)")
  ].join("\n");

  const currentDoc = flatFiles.find((item) => item.path === sourcePath);
  const currentParent = currentDoc
    ? currentDoc.path.split("/").slice(0, -1).join("/")
    : getSelectedFolderPath();

  const targetFolder = window.prompt(message, currentParent);
  if (targetFolder === null) {
    return;
  }

  await moveItem(sourcePath, targetFolder.trim());
}

async function safeJson(res) {
  try {
    return await res.json();
  } catch {
    return {};
  }
}

async function login() {
  const email = window.prompt("Nhap email:");
  if (email === null) {
    return;
  }

  const password = window.prompt("Nhap mat khau:");
  if (password === null) {
    return;
  }

  const res = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: email.trim(),
      password
    })
  });

  const data = await safeJson(res);
  if (!res.ok) {
    throw new Error(data.error || `Dang nhap that bai: ${res.status}`);
  }

  authState = data;
  applyAuthUI();
  renderNav(searchInput.value);
  setStatus("Da dang nhap");
}

async function logout() {
  const res = await fetch("/api/logout", {
    method: "POST"
  });

  const data = await safeJson(res);
  if (!res.ok) {
    throw new Error(data.error || `Dang xuat that bai: ${res.status}`);
  }

  authState = data;
  applyAuthUI();
  renderNav(searchInput.value);
  setStatus("Da dang xuat");
}

function encodePath(path) {
  return path.split("/").map(encodeURIComponent).join("/");
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

prevBtn.onclick = async () => {
  if (!(await confirmLeaveEditMode())) {
    return;
  }
  if (currentIndex > 0) {
    await loadDoc(currentIndex - 1);
  }
};

nextBtn.onclick = async () => {
  if (!(await confirmLeaveEditMode())) {
    return;
  }
  if (currentIndex < flatFiles.length - 1) {
    await loadDoc(currentIndex + 1);
  }
};

searchInput.oninput = () => renderNav(searchInput.value);
mobileToggle.onclick = () => sidebar.classList.toggle("open");
authBtn.onclick = async () => {
  try {
    if (authState.authenticated) {
      await logout();
    } else {
      await login();
    }
  } catch (error) {
    setStatus(error.message);
  }
};
editBtn.onclick = () => enterEditMode();
openFileBtn.onclick = () => {
  const doc = flatFiles[currentIndex];
  if (doc) {
    window.open(`/docs/${encodePath(doc.path)}`, "_blank", "noopener,noreferrer");
  }
};
moveBtn.onclick = async () => {
  const doc = flatFiles[currentIndex];
  if (!doc) {
    return;
  }

  try {
    await promptMoveItem(doc.path);
  } catch (error) {
    setStatus(error.message);
  }
};
deleteBtn.onclick = async () => {
  const doc = flatFiles[currentIndex];
  if (!doc) {
    return;
  }

  if (!window.confirm(`Xoa "${doc.name}"?`)) {
    return;
  }

  try {
    await deleteItem(doc.path);
  } catch (error) {
    setStatus(error.message);
  }
};

cancelBtn.onclick = async () => {
  exitEditMode();
  await renderMarkdown(currentDocText);
  setStatus("Da huy thay doi");
};

saveBtn.onclick = async () => {
  try {
    await saveCurrentDoc();
  } catch (error) {
    showError(error.message);
  }
};

newFolderBtn.onclick = async () => {
  try {
    await createFolder();
  } catch (error) {
    setStatus(error.message);
  }
};

newDocBtn.onclick = async () => {
  try {
    await createDocument();
  } catch (error) {
    setStatus(error.message);
  }
};

["dragenter", "dragover"].forEach((eventName) => {
  dropHint.addEventListener(eventName, (event) => {
    event.preventDefault();
    dropHint.classList.add("drag-over");
  });
});

["dragleave", "dragend", "drop"].forEach((eventName) => {
  dropHint.addEventListener(eventName, () => {
    dropHint.classList.remove("drag-over");
  });
});

dropHint.addEventListener("drop", async (event) => {
  event.preventDefault();
  try {
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      await handleFileDrop(event.dataTransfer.files, "");
      return;
    }

    const sourcePath = event.dataTransfer.getData("text/plain") || draggedItemPath;
    if (sourcePath) {
      await moveItem(sourcePath, "");
    }
  } catch (error) {
    setStatus(error.message);
  }
});

document.onkeydown = (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s" && isEditing) {
    e.preventDefault();
    saveBtn.click();
    return;
  }

  if (isEditing) {
    return;
  }

  if (e.key === "ArrowLeft") prevBtn.click();
  if (e.key === "ArrowRight") nextBtn.click();
};
