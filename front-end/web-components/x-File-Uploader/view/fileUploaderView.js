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
    this.fileInput.required = true;
    this.fileInput.id = "file-input";
    this.fileInput.multiple = true;

    this.DivBtn = document.createElement("div");
    this.DivBtn.classList.add("btnDiv");

    this.BtnSendFile = document.createElement("button");
    this.BtnSendFile.setAttribute("role", "button");
    this.BtnSendFile.classList.add("button-name");
    this.BtnSendFile.textContent = "Upload";

    this.DivProgressBar = document.createElement("div");
    this.DivProgressBar.classList.add("Div");

    this.progressBar = document.createElement("progress");
    this.progressBar.setAttribute("max", "100");
    this.progressBar.setAttribute("value", "0");

    this.progressSpan = document.createElement("span");
    this.progressSpan.className = "progress-span";
    this.progressSpan.textContent = "0%";

    this.DivBtn.appendChild(this.BtnSendFile);
    this.DivProgressBar.appendChild(this.progressSpan);
    this.DivProgressBar.appendChild(this.progressBar);

    this.label.appendChild(this.dropTitle);
    this.label.appendChild(this.fileInput);
    this.form.appendChild(this.Title);
    this.form.appendChild(this.label);
    this.form.appendChild(this.DivBtn);
    this.form.appendChild(this.DivProgressBar);

    this.appendChild(this.form);

    /*  this.form.action = "http://localhost:3000/upload";
    this.form.method = "post"; */
  }
}

customElements.define("file-uploader-view", FileUploaderView);

export { FileUploaderView };
