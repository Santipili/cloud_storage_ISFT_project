import { FSexplorer } from "./web-components/x-fileSystem-Explorer/x-fileSystemExplorer.js";

function main() {
  const FSExplorer = new FSexplorer();

  document.body.appendChild(FSExplorer);
}

window.addEventListener("load", main);
