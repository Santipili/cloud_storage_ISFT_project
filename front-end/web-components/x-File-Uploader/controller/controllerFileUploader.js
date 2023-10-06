class FileUploaderController {
  constructor(viewReference, modelReference) {
    this.view = viewReference;
    this.model = modelReference;

    /* ---------------- */
    this.model.addEventListener("progressbar", (event) => {
      this.onUploadProgress(event);
    });
  }

  enable() {
    this.view.BtnSendFile.onclick = (event) => this.onButtonSendFile(event);
  }

  disable() {
    this.view.BtnSendFile.onclick = null;
  }

  onUploadProgress(event) {
    this.view.updateProgressBar(event.detail);
  }

  async onButtonSendFile(e) {
    e.preventDefault();

    let responseView = this.view.getFormData();

    if (responseView.status == true) {
      this.view.enableProgressBar();

      // const cleanfiles = this.__cleanFiles(responseView.data);  Tira un error en el servidor del back.

      let res = await this.model.FileUploaderToServer(responseView.data);

      if (res.status) {
        this.view.disableProgressBar();
      }
      console.log(res);
    } else {
      console.log(responseView);
    }
  }

  __cleanFiles(formData) {
    const fileInput = formData.getAll("file");

    return [...fileInput].filter((file) => {
      return file instanceof File && file.type !== "";
    });
  }
}

export { FileUploaderController };
