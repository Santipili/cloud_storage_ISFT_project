class FileUploaderController {
  constructor(viewReference, modelReference, modalReference) {
    this.view = viewReference;
    this.model = modelReference;
    this.modalView = modalReference;

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
    this.modalView.updateProgressBar(event.detail);
  }

  async onButtonSendFile(e) {
    e.preventDefault();

    let responseView = this.view.getFormData();

    if (responseView.status == true) {
      this.modalView.show();

      // const cleanfiles = this.__cleanFiles(responseView.data);  Tira un error en el servidor del back.

      let res = await this.model.FileUploaderToServer(responseView.data);

      if (res.status) {
        this.modalView.hide();

        //TODO: check after merge
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
