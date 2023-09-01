class FileUploaderView extends HTMLElement {
  constructor() {
    super();

    this.form = document.createElement("form");
    this.form.className = "form";
    this.form.enctype = "multipart/form-data";

    this.Title = document.createElement("span");
    this.Title.className = "form-title";
    this.Title.textContent = "Upload your file";

    this.paragraph = document.createElement("p");
    this.paragraph.className = "form-paragraph";
    this.paragraph.textContent = "File should be an image";

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

    this.BtnSendFile = document.createElement("button");
    this.BtnSendFile.type = "submit";

    // Agrega los elementos al formulario y al Shadow DOM
    this.label.appendChild(this.dropTitle);
    this.label.appendChild(this.fileInput);

    this.form.appendChild(this.Title);
    this.form.appendChild(this.paragraph);
    this.form.appendChild(this.label);
    this.form.appendChild(this.BtnSendFile);

    this.appendChild(this.form);

    /*  this.form.action = "http://localhost:3000/upload";
    this.form.method = "post"; */
  }
}

customElements.define("file-uploader-view", FileUploaderView);

export { FileUploaderView };
