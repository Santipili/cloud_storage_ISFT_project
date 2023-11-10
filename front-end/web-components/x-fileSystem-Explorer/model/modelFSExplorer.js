import { ApiClient } from "../../../common/ApiClient.js";

class ModelFSExplorer {
  constructor() {
    this.apiClient = new ApiClient("http://localhost:3000/");
  }

  async getServerDirectoris(toListDir) {
    try {
      let response = await this.apiClient.makeApiCall(
        "directoryHandler/listcontent",
        "POST",
        toListDir,
        "hsavhavdhavdha",
        "1"
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  async deleteFile(path) {
    try {
      let response = await this.apiClient.makeApiCall(
        "directoryHandler/delete",
        "POST",
        path,
        "hsavhavdhavdha",
        "1"
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}

export { ModelFSExplorer };
