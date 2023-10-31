class FileUploaderModel extends EventTarget {
  constructor() {
    super();
  }

  async FileUploaderToServer(formData) {
    
    const url = "http://localhost:3000/filesHandler/upload";

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open("POST", url, true);

      xhr.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          const percentCompleted = (event.loaded / event.total) * 100;

          this.dispatchEvent(
            new CustomEvent("progressbar", { detail: percentCompleted })
          );
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
