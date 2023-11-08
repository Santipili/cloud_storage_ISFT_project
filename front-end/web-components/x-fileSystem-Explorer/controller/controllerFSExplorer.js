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
    this.view.__setFileSystemTree(res.files);
    this.view.renderFileSystem(res.files);
    console.log(res);
  }
}

export { ControllerFSExplorer };
