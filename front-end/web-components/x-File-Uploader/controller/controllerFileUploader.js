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
    const file = this.validFile.filterFiles(fileInput); 

    if (fileInput.length != 0) 
    {
        if (file != 0)
        {
            const formData = new FormData();
            Object.keys(file).forEach((k) => {
            formData.append("file", file[k]);
            });

            this.model.FileUploaderToServer(formData, (percentCompleted) => {
            this.updateProgressBar(percentCompleted);
            })
        }else{

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
  }
}

export { FileUploaderController };
