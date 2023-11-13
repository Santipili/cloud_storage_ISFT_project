class FileUploaderView extends HTMLElement {
  constructor() {
    super();

    this.form = document.createElement("form");
    this.form.className = "form";
    this.form.enctype = "multipart/form-data";

    this.Title = document.createElement("span");
    this.Title.className = "form-title";
    this.Title.textContent = "Upload your files";

    this.label = document.createElement("label");
    this.label.htmlFor = "file-input";
    this.label.className = "drop-container";

    this.dropTitle = document.createElement("span");
    this.dropTitle.className = "drop-title";
    this.dropTitle.textContent = "Drop files here or";

    this.fileInput = document.createElement("input");
    this.fileInput.type = "file";
    this.fileInput.accept = "*/*";

    this.fileInput.id = "file-input";
    this.fileInput.multiple = true;

    this.DivBtn = document.createElement("div");
    this.DivBtn.classList.add("btnDiv");

    this.BtnSendFile = document.createElement("button");
    this.BtnSendFile.setAttribute("role", "button");
    this.BtnSendFile.classList.add("button-name");
    this.BtnSendFile.textContent = "Upload";
    this.BtnSendFile.setAttribute("style", "display: none;");
    this.BtnSendFile.disabled = true;
    this.DivBtn.appendChild(this.BtnSendFile);

    this.label.appendChild(this.dropTitle);
    this.label.appendChild(this.fileInput);
    this.form.appendChild(this.Title);
    this.form.appendChild(this.label);
    this.form.appendChild(this.DivBtn);
    this.appendChild(this.form);

    this.fileListContainer = document.createElement("div");
    this.fileListContainer.className = "file-list";
    this.form.appendChild(this.fileListContainer);

    this.selectedFiles = new Set();

    this.BtnSendFile.addEventListener("click", () => {
      this.uploadAllFiles();
    });

    this.fileInput.addEventListener("change", () => {
      this.updateSelectedFiles();
      this.updateFileList();
      this.BtnSendFile.disabled = false;
      this.BtnSendFile.setAttribute("style", "display: inline-flex;");
    });

    this.label.addEventListener("dragover", (event) => {
      event.preventDefault();
      if (!this.label.classList.contains("drag-over")) {
        this.label.classList.add("drag-over");
      }
    });

    this.label.addEventListener("dragleave", (event) => {
      event.preventDefault();
      this.label.classList.remove("drag-over");
    });

    this.label.addEventListener("drop", (event) => {
      this.label.classList.remove("drag-over");
    });
  }

  updateFileList() {
    this.fileListContainer.innerHTML = "";

    for (const file of this.selectedFiles) {
      const fileItem = document.createElement("div");
      fileItem.className = "file-item";

      const fileName = document.createElement("span");
      fileName.textContent = file.name;

      const unselectButon = document.createElement("button");
      unselectButon.classList.add("unselect-button");
      unselectButon.textContent = "unselect";
      unselectButon.onclick = () => {
        this.removeFile(file);
      };

      fileItem.appendChild(fileName);
      fileItem.appendChild(unselectButon);
      this.fileListContainer.appendChild(fileItem);
    }

    if (this.selectedFiles.size === 0) {
      this.BtnSendFile.style.display = "none";
      this.fileInput.value = "";
    } else {
      this.BtnSendFile.style.display = "inline-flex";
    }
  }

  removeFile(file) {
    this.selectedFiles.delete(file);
    this.filesArray = Array.from(this.fileInput.files);

    const index = this.filesArray.filter((f) => {
      return f.name != file.name;
    });

    if (index !== -1) {
      let list = new DataTransfer();
      index.forEach((f) => {
        const file = new File(["content"], f.name, {
          lastModified: f.lastModified,
          type: f.type,
        });
        list.items.add(file);
      });
      this.filesArray.splice(index, 1);
      let myFileList = list.files;

      for (let i = 0; i < this.filesArray.length; i++) {
        this.fileInput.files = myFileList;
      }
    }
    this.updateFileList();
  }

  updateSelectedFiles() {
    this.selectedFiles = new Set(Array.from(this.fileInput.files));
  }

  uploadAllFiles() {
    this.formData = new FormData();

    for (const file of this.selectedFiles) {
      this.formData.append("file", file);
    }
  }

  getFormData() {
    const fileInput = this.fileInput.files;

    if (fileInput != null && fileInput.length !== 0) {
      for (let i = 0; i < fileInput.length; i++) {
        this.formData.append("file", fileInput[i]);
      }

      const res = {
        data: this.formData,
        status: true,
      };

      return res;
    } else {
      const res = {
        status: false,
        message: "Error: no files selected",
      };
      return res;
    }
  }
  progreesBar() {
    this.form = document.createElement("form");
    this.form.className = "form";
    this.form.enctype = "multipart/form-data";

    this.DivProgressBar = document.createElement("div");
    this.DivProgressBar.classList.add("Div");

    this.progressBar = document.createElement("progress");
    this.progressBar.setAttribute("max", "100");
    this.progressBar.setAttribute("value", "0");
    this.progressBar.setAttribute("style", "display: none;");

    this.progressSpan = document.createElement("span");
    this.progressSpan.className = "progress-span";
    this.progressSpan.textContent = "0%";
    this.progressSpan.setAttribute("style", "display: none;");

    this.DivProgressBar.appendChild(this.progressSpan);
    this.DivProgressBar.appendChild(this.progressBar);
    this.form.appendChild(this.DivProgressBar);
  }

  show() {
    this.DivProgressBar.setAttribute("style", "display: block;");
    this.progressBar.setAttribute("style", "display: block;");
    this.progressSpan.setAttribute("style", "display: block;");
  }

  hide() {
    this.fileListContainer.setAttribute("style", "display: none;");
    this.BtnSendFile.style.display = "none";
    this.fileInput.value = "";
    this.form.setAttribute("style", "display: none;");
    this.DivProgressBar.setAttribute("style", "display: none;");
    this.progressBar.setAttribute("style", "display: none;");
    this.progressSpan.setAttribute("style", "display: none;");
  }

  updateProgressBar(percentCompleted) {
    this.progressBar.value = percentCompleted;
    this.progressSpan.innerText = `${Math.round(percentCompleted)}%`;
    this.appendChild(this.form);
  }
}

customElements.define("file-uploader-view", FileUploaderView);

export { FileUploaderView };
