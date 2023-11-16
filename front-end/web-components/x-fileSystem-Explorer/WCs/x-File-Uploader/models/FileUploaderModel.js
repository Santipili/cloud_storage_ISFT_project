import { LocalStorageHandler } from "../../../../../common/LocalStorageHandler.js";
import { configApiFileSystem } from "../../../../../config.js";

class FileUploaderModel extends EventTarget {
  constructor() {
    super();
    this.localStorageHandler = new LocalStorageHandler();
  }

  async FileUploaderToServer(formData) {
    const userId = this.localStorageHandler.getOfLocalStorage("userId");

    const url = `${configApiFileSystem.url}filesHandler/upload`;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open("POST", url, true);
      xhr.setRequestHeader("user-id", userId);

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
