import { LocalStorageHandler } from "../../../common/LocalStorageHandler.js";
import { ApiClient } from "../../../common/ApiClient.js";

class navBarModel2 {
  constructor() {
    this.localStorageH = new LocalStorageHandler();
    this.apiClient = new ApiClient("http://localhost:3000/");
  }
  async logout() {
    try {
      const userId = this.localStorageH.getOfLocalStorage("userId");
      const token = this.localStorageH.getOfLocalStorage("Token");

      if (userId && token) {
        let response = await this.apiClient.makeApiCall(
          "sessionhandler/logout",
          "POST",
          null,
          token,
          userId
        );
        this.localStorageH.cleanLocalStorage();
        console.log(response);
        return response;
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export { navBarModel2 };
