import { ModelFSExplorer } from "../model/modelFSExplorer.js";
import { ViewFSExplorer } from "../view/viewFSExplorer.js";

class ControllerFSExplorer {
  constructor(innerView, innerModel) {
    this.view = innerView;
    this.model = innerModel;
  }

  enable() {
    this.setContent();
  }
  disable() {}

  async setContent() {
    const res = await this.model.getServerDirectoris("/");

    this.view.addTableRow(res.files);
    console.log(res);
  }
}

export { ControllerFSExplorer };
