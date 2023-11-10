import { ApiClient } from "../../../common/ApiClient.js";

class ModelFSExplorer {
  constructor() {
    this.apiClient = new ApiClient("http://localhost:3000/");
  }

  async getServerDirectoris(toListDir) {
    try {
      let response = await this.apiClient.makeApiCall(
        "directoryHandler/list",
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
    const [pathToDelte] = path;
    console.log(pathToDelte);
    try {
      let response = await this.apiClient.makeApiCall(
        "directoryHandler/delete",
        "POST",
        pathToDelte,
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