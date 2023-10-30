class FileUploaderController {
  constructor(viewReference, modelReference, modalReference) {
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
      this.view.progreesBar();
      this.view.show();

      // const cleanfiles = this.__cleanFiles(responseView.data);  Tira un error en el servidor del back.
    
      let res = await this.model.FileUploaderToServer(responseView.data);

      if (res.status) {
        this.view.hide();

        //TODO: check after merge
      }
    } else {

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
