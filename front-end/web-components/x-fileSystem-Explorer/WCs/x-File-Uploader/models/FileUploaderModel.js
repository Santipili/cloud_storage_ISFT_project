import { LocalStorageHandler } from "../../../../../common/LocalStorageHandler.js";
import { configApiFileSystem } from "../../../../../config.js";

class FileUploaderModel extends EventTarget {
  constructor() {
    super();
    this.localStorageHandler = new LocalStorageHandler();
    this.xhr = null;
  }

  async FileUploaderToServer(formData) {
    const userId = this.localStorageHandler.getOfLocalStorage("userId");
    const url = `${configApiFileSystem.url}filesHandler/upload`;

    return new Promise((resolve, reject) => {
      this.xhr = new XMLHttpRequest();

      this.xhr.open("POST", url, true);
      this.xhr.setRequestHeader("user-id", userId);

      this.xhr.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          const percentCompleted = (event.loaded / event.total) * 100;
          this.dispatchEvent(
            new CustomEvent("progressbar", { detail: percentCompleted })
          );
        }
      });

      this.xhr.onreadystatechange = () => {
        if (this.xhr.readyState === 4) {
          if (this.xhr.status === 200) {
            resolve({ status: true, message: "Success, Loading complete" });
          } else {
            reject({ status: false, message: "Loading error" });
          }
        }
      };

      this.xhr.send(formData);
    });
  }

  cancelUpload() {
    if (this.xhr) {
      this.xhr.abort();
      console.log("Carga cancelada");
    } else {
      console.log("No hay ninguna carga en progreso para cancelar");
    }
  }
}

export { FileUploaderModel };
