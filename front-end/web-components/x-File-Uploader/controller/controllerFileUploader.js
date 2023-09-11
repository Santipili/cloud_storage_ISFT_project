class FileUploaderController {
  constructor(viewReference, modelReference) {
    this.view = viewReference;
    this.model = modelReference;
    this.progressBar = this.view.progressBar;
    this.progressSpan = this.view.progressSpan;
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
    this.view.BtnSendFile = null;
  }

  async onButtonBtnSendFile() {
    let fileInput = this.view.fileInput.files;
    const formData = new FormData();
  
    Object.keys(fileInput).forEach((k) => {
      formData.append("file", fileInput[k]);
    });

    this.model.FileUploaderToServer(formData, (percentCompleted) => {
      this.updateProgressBar(percentCompleted);
    })
    .then(() => {
      console.log('Carga completa');
    })
    .catch((error) => {
      console.error(error.error);
    });  
  }

  updateProgressBar(percentCompleted) {
    
    this.progressBar.value = percentCompleted;
    this.progressSpan.innerText = `${Math.round(percentCompleted)}%`;
  }
}

export { FileUploaderController };
