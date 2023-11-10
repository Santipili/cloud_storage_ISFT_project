import { FileUploader } from "../WCs/x-File-Uploader/FileUploader.js";

class ControllerFSExplorer {
  constructor(innerView, innerModel) {
    this.view = innerView;
    this.model = innerModel;
    this.fileUploader = new FileUploader();
  }

  enable() {
    this.setContent();

    this.view.addEventListener("click-delete-button", async (d) => {
      await this.deleteFile(d.detail);
    });
    this.view.addEventListener("click-folder", async (d) => {
      const res = await this.model.getServerDirectoris(d.detail);
      this.view.renderFileSystem(res.files);
    });

    this.view.addEventListener("click-upload-button", async (d) => {
      document.body.appendChild(this.fileUploader);
    });
  }

  disable() {}

  async setContent() {
    const res = await this.model.getServerDirectoris("/");

    this.view.renderFileSystem(res.files);
  }
  async deleteFile(paths) {
    paths.forEach((Element) => {
      this.model.deleteFile(Element);
    });
  }
}

export { ControllerFSExplorer };
