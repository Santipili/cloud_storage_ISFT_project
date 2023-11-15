import { LocalStorageHandler } from "../../../common/LocalStorageHandler.js";
import { ApiClient } from "../../../common/ApiClient.js";

class SignUpModel {
  constructor() {
    this.localStorageH = new LocalStorageHandler();
    this.apiClient = new ApiClient("http://localhost:3000/");
  }
  async signUp(data) {
    try {
      let response = await this.apiClient.makeApiCall(
        "sessionhandler/signup",
        "POST",
        data
      );

      return response;
    } catch (error) {
      console.log(error);
    }
  }
}

export { SignUpModel };
