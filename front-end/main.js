import { FileUploader } from "./web-components/x-File-Uploader/FileUploader.js";

import { FileUploaderView } from "./web-components/x-File-Uploader/view/fileUploaderView.js";

function main() {
  let fileUploader = new FileUploader();

  /* let fileUploaderView = new FileUploaderView(); */

  document.body.appendChild(fileUploader);
}

window.addEventListener("load", main);
