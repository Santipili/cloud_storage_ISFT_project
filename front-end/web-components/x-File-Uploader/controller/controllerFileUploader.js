class FileUploaderController {
  constructor(viewReference, modelReference) {
    this.view = viewReference;
    this.model = modelReference;
  }

  enable() {
    this.view.BtnSendFile.addEventListener("click", async (e) => {
      e.preventDefault();

      // Deshabilita el botón mientras se realiza la operación
      this.view.BtnSendFile.disabled = true;

      try {
        await this.onButtonBtnSendFile();
      } catch (error) {
        // Maneja errores si es necesario
      } finally {
        // Habilita el botón nuevamente cuando la operación ha finalizado (éxito o error)
        this.view.BtnSendFile.disabled = false;
      }
    });
  }

  disable() {
    this.view.btnSignUp = null;
    this.view.btnForgotPassw = null;
  }

  async onButtonBtnSendFile() {
    let fileInput = this.view.fileInput.files;
    let progressBar = this.view.progressBar;

    const formData = new FormData();

    Object.keys(fileInput).forEach((k) => {
      formData.append("file", fileInput[k]);
    });

    const url = "http://localhost:3000/upload";

    try {
      const response = await axios.post(url, formData);
      const result = response.data;
      progressBar.value = 100;
      return result;
    } catch (error) {
      console.log(error.message);
    }
  }
}

export { FileUploaderController };
