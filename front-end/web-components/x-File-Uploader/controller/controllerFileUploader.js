class FileUploaderController {
  constructor(viewReference, modelReference) {
    this.view = viewReference;
    this.model = modelReference;
  }

  enable() {
    this.view.BtnSendFile.addEventListener("click", (e) => {
      e.preventDefault();
      this.onButtonBtnSendFile();
    });
  }

  disable() {
    this.view.btnSignUp = null;
    this.view.btnForgotPassw = null;
  }
  async onButtonBtnSendFile() {
    let fileInput = this.view.fileInput.files;
    console.log(Object.keys(fileInput));
    const formData = new FormData();

    Object.keys(fileInput).forEach((k) => {
      formData.append("file", fileInput[k]);
    });

    try {
      let requestMetadata = {
        method: "POST",
        body: formData,
      };

      let res = await fetch("http://localhost:3000/upload", requestMetadata);
      let jsonBody = await res.json();
      alert(jsonBody.message);
      return res;
    } catch (error) {
      alert(error.message);
    }
  }
}

export { FileUploaderController };
