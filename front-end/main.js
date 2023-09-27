import { FileUploader } from "./web-components/x-File-Uploader/FileUploader.js";


function main() {
  let fileUploader = new FileUploader();
  document.body.appendChild(fileUploader);
}

window.addEventListener("load", main);
