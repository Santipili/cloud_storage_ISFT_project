import { LocalStorageHandler } from "../../../common/LocalStorageHandler.js";
import { ApiClient } from "../../../common/ApiClient.js";
import { configApiFileSystem } from "../../../config.js";

class LoginFormModel {
  constructor() {
    this.localStorageH = new LocalStorageHandler();
    this.apiClient = new ApiClient(configApiFileSystem.url);
  }
  async login(data) {
    try {
      let response = await this.apiClient.makeApiCall(
        "sessionhandler/login",
        "POST",
        data
      );

      const id = response.data;

      /*  const token = response.Token; */
      if (response.status) {
        this.localStorageH.setOnlocalStorage("userId", id);
        /*  this.localStorageH.setOnlocalStorage("Token", token); */
        return response;
      } else {
        return response;
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export { LoginFormModel };
