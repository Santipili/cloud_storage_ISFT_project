class FileUploaderController extends EventTarget {
  constructor(viewReference, modelReference) {
    super();
    this.view = viewReference;
    this.model = modelReference;

    /* ---------------- */
    this.model.addEventListener("progressbar", (event) => {
      this.onUploadProgress(event);
    });

    this.view.addEventListener("cancel-upload", () => {
      this.onUploadCancelClick();
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

      let res = await this.model.FileUploaderToServer(responseView.data);

      if (res.status) {
        this.view.hide();
        this.dispatchEvent(new CustomEvent("file-uploaded"));
      }
    } else {
      alert(responseView.message);
    }
  }

  onUploadCancelClick() {
    this.model.cancelUpload();
  }
}

export { FileUploaderController };
