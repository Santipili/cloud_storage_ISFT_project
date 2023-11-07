import { FileUploaderView } from "./view/fileUploaderView.js";
import { FileUploaderModel } from "./models/FileUploaderModel.js";
import { FileUploaderController } from "./controller/controllerFileUploader.js";

class FileUploader extends HTMLElement {
  constructor() {
    super();

    this.view = new FileUploaderView();
    this.model = new FileUploaderModel();
    this.controller = new FileUploaderController(this.view, this.model);

    let style = document.createElement("style");
    style.innerText = `@import './web-components/x-File-Uploader/style/style.css'`;
    this.appendChild(style);
    this.appendChild(this.view);
  }

  connectedCallback() {
    this.controller.enable();
  }

  disconnectedCallback() {
    this.controller.disable();
  }
}
customElements.define("file-uploader", FileUploader);
export { FileUploader };
