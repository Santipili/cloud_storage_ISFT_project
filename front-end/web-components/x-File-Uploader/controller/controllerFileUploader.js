class FileUploaderController 
{
  constructor(viewReference, modelReference, validFile) 
  {
    this.view = viewReference;
    this.model = modelReference;
    this.validFile = validFile; 
    this.progressBar = this.view.progressBar;
    this.progressSpan = this.view.progressSpan;
  }

  enable() 
  {
    this.view.BtnSendFile.addEventListener("click", async (e) => {
      e.preventDefault();
      this.view.enableProgressBar();
    
      this.view.BtnSendFile.disabled = true;

      try {
        await this.onButtonBtnSendFile();
      } catch (error) {
   
      } finally {
        this.view.BtnSendFile.disabled = false;
      }
    });
  }
  
  disable() {
    this.view.BtnSendFile = null;
  }

  async onButtonBtnSendFile() {
    let fileInput = this.view.fileInput.files;
<<<<<<< HEAD
    const file = this.validFile.filterFiles(fileInput); 
=======
    let progressBar = this.view.progressBar;
    let progressSpan = this.view.progressSpan;

    const formData = new FormData();

    Object.keys(fileInput).forEach((k) => {
      formData.append("file", fileInput[k]);
    });
>>>>>>> d8f0b1798dda6d72ed9dbb516dd6eab0b79c4177

    if (fileInput.length != 0) 
    {
        if (file != 0)
        {
            const formData = new FormData();
    
            Object.keys(file).forEach((k) => {
            formData.append("file", file[k]);
            });

<<<<<<< HEAD
            this.model.FileUploaderToServer(formData, (percentCompleted) => {
            this.updateProgressBar(percentCompleted);
            })
        }else{
=======
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
>>>>>>> d8f0b1798dda6d72ed9dbb516dd6eab0b79c4177

            alert("Elija un archivos no se pueden cargar carpetas"); 
        }
    }else
        {
            alert("Tiene que elegir un archivo antes de presionar boton Upload!")
        }
    }    
  updateProgressBar(percentCompleted) {
    
    this.progressBar.value = percentCompleted;
    this.progressSpan.innerText = `${Math.round(percentCompleted)}%`;
    if (Math.round(percentCompleted) === 100)
    {
      this.view.disableProgressBar(); 
    }
     
  }
}

export { FileUploaderController };
