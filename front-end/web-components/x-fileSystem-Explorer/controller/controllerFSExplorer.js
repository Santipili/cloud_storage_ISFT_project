class ControllerFSExplorer {
  constructor(innerView, innerModel) {
    this.view = innerView;
    this.model = innerModel;
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

    this.view.addEventListener("click-download-button", async (d) => {
      await this.onDownloadButonClick();
    });

    this.view.addEventListener("click-createFolder-button", async (d) => {
      await this.model.createFolder(d.detail);
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

  async onDownloadButonClick() {
    const res = await this.model.downloadFile();
  }
}

export { ControllerFSExplorer };
