import { FileUploaderView } from "./view/fileUploaderView.js";
import { FileUploaderModel } from "./models/FileUploaderModel.js";
import { FileUploaderController } from "./controller/controllerFileUploader.js";
import { ModalUploaderView} from "./view/modalUploadView.js"; 

class FileUploader extends HTMLElement {
  constructor() {
    super();

    this.view = new FileUploaderView();
    this.model = new FileUploaderModel();
    this.modalView = new ModalUploaderView(); 
    this.controller = new FileUploaderController(this.view, this.model, this.modalView );

    let style = document.createElement("style");
    style.innerText = `@import './web-components/x-File-Uploader/style/style.css'`;
    this.appendChild(style);
    this.appendChild(this.view);
    this.appendChild(this.modalView);
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
