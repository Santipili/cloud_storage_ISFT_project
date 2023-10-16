class FileUploaderView extends HTMLElement {
  constructor() {
    super();

    this.form = document.createElement("form");
    this.form.className = "form";
    this.form.enctype = "multipart/form-data";

    this.Title = document.createElement("span");
    this.Title.className = "form-title";
    this.Title.textContent = "Upload your file";

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

    this.fileInput.addEventListener("change", () => {
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
  ;
    });
  
    this.label.addEventListener("drop", (event) => {
      this.label.classList.remove("drag-over");
    });
    
  }
  connectedCallback() {}

  disconnectedCallback() {}

  getFormData() {
    const fileInput = this.fileInput.files;

    if (fileInput != null && fileInput.length !== 0) {
      const formData = new FormData();

      Object.keys(fileInput).forEach((k) => {
        formData.append("file", fileInput[k]);
      });

      const res = {
        data: formData,
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
}

customElements.define("file-uploader-view", FileUploaderView);

export { FileUploaderView };