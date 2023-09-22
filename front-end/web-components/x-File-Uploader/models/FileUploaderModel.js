class FileUploaderModel {
  constructor() {}

  async onButtonBtnSendFile() {
    let fileInput = this.view.fileInput.files;
    let progressBar = this.view.progressBar;
    let progressSpan = this.view.progressSpan;

    const formData = new FormData();

    Object.keys(fileInput).forEach((k) => {
      formData.append("file", fileInput[k]);
    });

    const url = "http://localhost:3000/upload";

    try {
      const response = await axios.post(url, formData, {
        onUploadProgress: (progressEvent) => {
          if (progressEvent) {
            let percentCompleted =
              (progressEvent.loaded / progressEvent.total) * 100;
            progressBar.value = percentCompleted;
            progressSpan.textContent = `${Math.round(percentCompleted)}%`;
          }
        },
      });

      console.log(response);
    } catch (error) {
      console.log(error.message);
    }
  }
  
}

export { FileUploaderModel };
