import { LocalStorageHandler } from "../../core/LocalStorageHandler.js";
import { ApiClient } from "../../core/ApiClient.js";

class AlertModel {
  constructor() {
    this.localStorageH = new LocalStorageHandler();
    this.apiClient = new ApiClient("http://localhost:3000/");
  }
}

export { AlertModel };
