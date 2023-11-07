/*

Vanilla JS WebComponent's Toolkit
Copyright (C) 2019  Matías Gastón Santiago

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.

*/

import { ApiClient } from "../../../common/ApiClient.js";
import { LocalStorageHandler } from "../../../common/LocalStorageHandler.js";

class HTMLDataTableServerModel extends EventTarget {
  constructor() {
    super();
    this.apiClient = new ApiClient("http://localhost:3000/");
    this.localStorageH = new LocalStorageHandler();
  }

  async getServerDirectoris() {
    const userId = this.localStorageH.getOfLocalStorage("userId");
    const token = this.localStorageH.getOfLocalStorage("Token");
    try {
      let response = await this.apiClient.makeApiCall(
        "directoryHandler/list",
        "POST",
        userId, //deberia responder en base a su id , la ruta de usuario armada en el servidor
        token,
        userId
      );

      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async getUserData() {
    try {
      const userId = this.localStorageH.getOfLocalStorage("userId");
      const token = this.localStorageH.getOfLocalStorage("Token");

      let response = await this.apiClient.makeApiCall(
        "groupHandler/getgroupsdata",
        "GET",
        null,
        token,
        userId
      );

      return response.groups;
    } catch (error) {
      console.log(error);
    }
  }
}

//export module
export { HTMLDataTableServerModel };
