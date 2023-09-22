class FileUploaderController {
  constructor(viewReference, modelReference, validFile) {
    this.view = viewReference;
    this.model = modelReference;
    this.validFile = validFile;
    this.progressBar = this.view.progressBar;
    this.progressSpan = this.view.progressSpan;
  }

  enable() {
    this.view.BtnSendFile.addEventListener("click", async (e) => {
      e.preventDefault();
      this.view.enableProgressBar();
      try {
        const res = await this.onButtonBtnSendFile();

        if (res.status == true) {
          console.log(res.message);
        } else {
          this.view.disableProgressBar();
          console.log(res.message);
        }
      } catch (error) {
        console.log(error);
      }
    });
  }

  disable() {
    this.view.BtnSendFile = null;
  }

  async onButtonBtnSendFile() {
    let fileInput = this.view.fileInput.files;
    const file = this.validFile.filterFiles(fileInput);

    if (fileInput.length != 0) {
      if (file != 0) {
        const formData = new FormData();

        Object.keys(file).forEach((k) => {
          formData.append("file", file[k]);
        });

        let res = await this.model.FileUploaderToServer(
          formData,
          (percentCompleted) => {
            this.updateProgressBar(percentCompleted);
          }
        );

        return res;
      } else {
        const res = {
          status: false,
          message: "Elija un archivos no se pueden cargar carpetas",
        };

        return res;
      }
    } else {
      const res = {
        status: false,
        message: "Tiene que elegir un archivo antes de presionar boton Upload!",
      };

      return res;
    }
  }
  updateProgressBar(percentCompleted) {
    this.progressBar.value = percentCompleted;
    this.progressSpan.innerText = `${Math.round(percentCompleted)}%`;
    if (Math.round(percentCompleted) === 100) {
      this.view.disableProgressBar();
    }
  }
}

export { FileUploaderController };
