import { ViewPathSelector } from "./view/ViewPathSelector.js";
import { ControllerPathSelector } from "./controller/controllerPathSelector.js";
import { ModelPathSelector } from "./model/modelPathSelector.js";

class PathSelector extends HTMLElement {
  constructor() {
    super();

    this.view = new ViewPathSelector();
    this.model = new ModelPathSelector();
    this.controller = new ControllerPathSelector(this.view, this.model);

    this.appendChild(this.view);
  }
  connectedCallback() {
    this.controller.enable();
  }

  disconnectedCallback() {
    this.controller.disable();
  }
}

customElements.define("x-path-selector", PathSelector);

export { PathSelector };
