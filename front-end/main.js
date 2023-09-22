import { FileUploader } from "./web-components/x-File-Uploader/FileUploader.js";
import { BackTest } from "./web-components/backTest.js";


function main() {
  // let fileUploader = new FileUploader();

  let Test = new BackTest(); 
  document.body.appendChild(Test);
}

window.addEventListener("load", main);
