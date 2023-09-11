class FileUploaderModel {
  constructor() {}

  async FileUploaderToServer(formData) {
    const url = "http://localhost:3000/upload";

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const progressValues = []; 

      xhr.open('POST', url, true);

      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          const percentCompleted = (event.loaded / event.total) * 100;
          progressValues.push(percentCompleted); 
        }
      });

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
          
            resolve(progressValues);
          } else {
            reject({ error: 'Error en la carga' }); 
          }
        }
      };

      xhr.send(formData);
    });
  }

  logIn() {}

  async signIn(data) {}
}

export { FileUploaderModel };
