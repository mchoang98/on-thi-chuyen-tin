const basePath = "on_tap/";
let docs = [];
let currentIndex = 0;
let currentDocText = "";
let isEditing = false;

const content = document.getElementById("content");
const navList = document.getElementById("navList");
const searchInput = document.getElementById("searchInput");
const breadcrumb = document.getElementById("breadcrumb");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const sidebar = document.getElementById("sidebar");
const mobileToggle = document.getElementById("mobileToggle");
const editBtn = document.getElementById("editBtn");
const saveBtn = document.getElementById("saveBtn");
const cancelBtn = document.getElementById("cancelBtn");
const editorPanel = document.getElementById("editorPanel");
const editorInput = document.getElementById("editorInput");
const statusText = document.getElementById("statusText");

init();

async function init() {
  try {
    await loadFilesFromAPI();
    currentIndex = findIndexByFile(getInitialFile());
    renderNav();
    await loadDoc(currentIndex);
  } catch (error) {
    showError(`Khong the ket noi backend: ${error.message}`);
  }
}

async function loadFilesFromAPI() {
  const res = await fetch("/api/files");
  if (!res.ok) {
    throw new Error(`API /api/files loi ${res.status}`);
  }

  const files = await res.json();
  if (!Array.isArray(files)) {
    throw new Error("Backend tra ve du lieu khong hop le");
  }

  docs = files
    .slice()
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }))
    .map((file) => ({
      file,
      title: file.replace(".md", "").replaceAll("_", " ")
    }));
}

async function fetchDocContent(file) {
  const res = await fetch(`/api/file/${encodeURIComponent(file)}`);
  if (!res.ok) {
    throw new Error(`API /api/file/${file} loi ${res.status}`);
  }
  return res.text();
}

function renderNav(filter = "") {
  navList.innerHTML = "";
  const keyword = filter.toLowerCase();

  docs.forEach((doc, index) => {
    if (keyword && !doc.file.toLowerCase().includes(keyword)) return;

    const btn = document.createElement("button");
    btn.textContent = doc.title;
    btn.className = index === currentIndex ? "active" : "";
    btn.onclick = async () => {
      if (!(await confirmLeaveEditMode())) {
        return;
      }

      await loadDoc(index);
      closeMobileMenu();
    };

    navList.appendChild(btn);
  });
}

async function loadDoc(index) {
  const doc = docs[index];
  if (!doc) {
    showError("Khong tim thay tai lieu can hien thi.");
    return;
  }

  currentIndex = index;
  currentDocText = await fetchDocContent(doc.file);
  await renderMarkdown(currentDocText);
  exitEditMode(false);
  breadcrumb.textContent = basePath + doc.file;
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
  const doc = docs[currentIndex];
  if (!doc) {
    return;
  }

  setStatus("Dang luu...");

  const res = await fetch(`/api/file/${encodeURIComponent(doc.file)}`, {
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
  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex === docs.length - 1;
  editBtn.disabled = docs.length === 0;
}

function getInitialFile() {
  const params = new URLSearchParams(window.location.search);
  return params.get("file") || "bai_1.md";
}

function findIndexByFile(file) {
  const index = docs.findIndex((doc) => doc.file === file);
  return index >= 0 ? index : 0;
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
  if (currentIndex < docs.length - 1) {
    await loadDoc(currentIndex + 1);
  }
};

searchInput.oninput = () => renderNav(searchInput.value);
mobileToggle.onclick = () => sidebar.classList.toggle("open");
editBtn.onclick = () => enterEditMode();

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
