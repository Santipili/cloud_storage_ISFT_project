import { LocalStorageHandler } from "./LocalStorageHandler.js";
import { ApiClient } from "./ApiClient.js";

class SessionHandler {
  constructor() {
    this.localStorageHandler = new LocalStorageHandler();
    this.baseUrl = "http://localhost:3000/";
    this.apiClient = new ApiClient(baseUrl);
  }

  logIn(useId, userName, password) {
    const Id = this.localStorageHandler.getOfLocalStorage("userId");
    const token = this.localStorageHandler.getOfLocalStorage("token");

    apiClient
      .makeApiCall("/login", "GET", {}, token, Id)
      .then((responseData) => {
        // Maneja la respuesta de la API aquí
        console.log(responseData);
      })
      .catch((error) => {
        // Maneja errores aquí
        console.error(error);
      });
  }

  logOut() {
    apiClient
      .makeApiCallWithoutToken("/public-endpoint", "GET", {})
      .then((responseData) => {
        // Maneja la respuesta de la API aquí
        console.log(responseData);
      })
      .catch((error) => {
        // Maneja errores aquí
        console.error(error);
      });
  }
}

export { SessionHandler };
