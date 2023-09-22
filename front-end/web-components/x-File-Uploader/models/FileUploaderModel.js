class FileUploaderModel {
  constructor() {}

  async FileUploaderToServer(formData, progressCallback) {
    const url = "http://localhost:3000/upload";

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open("POST", url, true);

      xhr.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          const percentCompleted = (event.loaded / event.total) * 100;

          progressCallback(percentCompleted);
        }
      });

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve({ status: true, message: "Success ,Loading complete" });
          } else {
            reject({ status: false, message: "Loading error" });
          }
        }
      };

      xhr.send(formData);
    });
  }
}

export { FileUploaderModel };
