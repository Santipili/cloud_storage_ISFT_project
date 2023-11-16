import { ApiClient } from "../../../common/ApiClient.js";
import { LocalStorageHandler } from "../../../common/LocalStorageHandler.js";

class ModelFSExplorer {
  constructor() {
    this.apiClient = new ApiClient("http://localhost:3000/");
    this.localStorageH = new LocalStorageHandler();
  }

  async getServerDirectoris(toListDir) {
    const userId = this.localStorageH.getOfLocalStorage("userId");
    const token = this.localStorageH.getOfLocalStorage("Token");

    try {
      let response = await this.apiClient.makeApiCall(
        "directoryHandler/listcontent",
        "POST",
        toListDir,
        "hsavhavdhavdha",
        userId
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  async deleteFile(path) {
    const userId = this.localStorageH.getOfLocalStorage("userId");
    try {
      let response = await this.apiClient.makeApiCall(
        "directoryHandler/delete",
        "POST",
        path,
        "hsavhavdhavdha",
        userId
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async downloadFile(path) {
    const userId = this.localStorageH.getOfLocalStorage("userId");
    try {
      let result = await this.apiClient.makeApiCall(
        "filesHandler/download",
        "POST",
        path,
        "hsavhavdhavdha",
        userId
      );

      const uint8Array = new Uint8Array(result.data.data);
      const blob = new Blob([uint8Array], { type: 'application/octet-stream' });
      
                    // Verifica si es Internet Explorer
      if (navigator.msSaveBlob) {
                    // Para Internet Explorer
        navigator.msSaveBlob(blob, result.fileName);
      } else {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = result.fileName;
        a.click();
        window.URL.revokeObjectURL(url);
      }
      
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async createFolder(path) {
    const userId = this.localStorageH.getOfLocalStorage("userId");
    try {
      let response = await this.apiClient.makeApiCall(
        "directoryHandler/create",
        "POST",
        path,
        "hsavhavdhavdha",
        userId
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  async renameFile(paths) {
    const userId = this.localStorageH.getOfLocalStorage("userId");
    try {
      let response = await this.apiClient.makeApiCall(
        "directoryHandler/rename",
        "POST",
        paths,
        "hsavhavdhavdha",
        userId
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async moveFile(paths) {
    const userId = this.localStorageH.getOfLocalStorage("userId");
    try {
      let response = await this.apiClient.makeApiCall(
        "directoryHandler/move",
        "POST",
        paths,
        "hsavhavdhavdha",
        userId
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}

export { ModelFSExplorer };
