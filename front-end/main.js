import { FileUploader } from "./web-components/x-File-Uploader/FileUploader.js";

import { FSexplorer } from "./web-components/x-fileSystem-Explorer/x-fileSystemExplorer.js";

function main() {
  let fileUploader = new FileUploader();
  const FSExplorer = new FSexplorer();

  document.body.appendChild(fileUploader);
  document.body.appendChild(FSExplorer);
}

window.addEventListener("load", main);
