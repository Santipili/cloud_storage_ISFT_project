import { ApiClient } from "../../../../../common/ApiClient.js";
import { LocalStorageHandler } from "../../../../../common/LocalStorageHandler.js";

class ModelPathSelector {
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
}

export { ModelPathSelector };