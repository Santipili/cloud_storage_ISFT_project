class ControllerFSExplorer {
  constructor(innerView, innerModel) {
    this.view = innerView;
    this.model = innerModel;
    this.view.addEventListener("click-delete-button", async (d) => {
      await this.deleteFile(d.detail);
    });
  }

  enable() {
    this.setContent();
  }
  disable() {}

  async setContent() {
    const res = await this.model.getServerDirectoris("/");
    this.view.__setFileSystemTree(res.files);
    this.view.renderFileSystem(res.files);
    console.log(res);
  }
  async deleteFile(path) {
    this.model.deleteFile(path);
  }
}

export { ControllerFSExplorer };
