class ControllerPathSelector {
  constructor(innerView, innerModel) {
    this.view = innerView;
    this.model = innerModel;
  }

  enable() {
    this.setContent();

    this.view.addEventListener("click-folder", async (d) => {
      const res = await this.model.getServerDirectoris(d.detail);
      this.view.renderFileSystem(res.files);
    });
  }

  disable() {}

  async setContent() {
    const res = await this.model.getServerDirectoris("/");
    this.view.renderFileSystem(res.files);
  }
}

export { ControllerPathSelector };
