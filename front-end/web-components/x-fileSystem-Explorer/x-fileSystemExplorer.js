import { ViewFSExplorer } from "./view/viewFSExplorer.js";
import { ControllerFSExplorer } from "./controller/controllerFSExplorer.js";
import { ModelFSExplorer } from "./model/modelFSExplorer.js";

class FSexplorer extends HTMLElement {
  constructor() {
    super();

    this.view = new ViewFSExplorer();
    this.model = new ModelFSExplorer();
    this.controller = new ControllerFSExplorer(this.view, this.model);

    this.appendChild(this.view);
  }
  connectedCallback() {
    this.controller.enable();
  }

  disconnectedCallback() {
    this.controller.disable();
  }
}

customElements.define("x-fsexplorer", FSexplorer);

export { FSexplorer };
