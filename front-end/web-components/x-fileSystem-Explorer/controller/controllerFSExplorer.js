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

    this.view.addEventListener("click-rename-button", async (d) => {
      const res = await this.model.renameFile(d.detail);
<<<<<<< HEAD
      console.log(res);
=======

>>>>>>> main
      if (res.status == true) {
        this.view.__refreshCurrentPath();
      }
    });

<<<<<<< HEAD
    this.view.addEventListener("click-move-button", async (d) => {
      const res = await this.model.moveFile(d.detail);
      if (res.status == true) {
        this.view.__refreshCurrentPath();
=======
    this.view.addEventListener("click-move-button", async (e) => {
      const pathsToMove = e.detail.originPaths;

      const destinationPaths = e.detail.destinationPaths;

      for (let i = 0; i < pathsToMove.length; i++) {
        const res = await this.model.moveFile({
          path: pathsToMove[i],
          destinationPath: destinationPaths[i],
        });
        if (res.status == true) {
          this.view.__refreshCurrentPath();
        }
>>>>>>> main
      }
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
