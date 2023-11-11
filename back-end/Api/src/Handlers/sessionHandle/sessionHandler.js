const { DataBase } = require("../../DB/DB.js");
const { catcher } = require("../../cacher/cacher.js");
const { promises } = require("fs-extra");

class SessionHandler {
  constructor() {
    this.db = new DataBase();
  }

  login(userName, password) {
    return new Promise(async (resolve, reject) => {
      try {
        const userAndPass = catcher.getCachedUserAndPass();

        if (
          userAndPass.has(userName) &&
          userAndPass.get(userName) === password
        ) {
          const userId = this.db.getuserIdByUserName(userName);
          resolve({ status: true, message: "login success", data: userId });
        } else {
          return reject({
            status: false,
            message: "An error occurred during login",
          });
        }
      } catch (error) {
        console.log(error);
      }
    });
  }

  logout(userId) {
    return new Promise((resolve, reject) => {
      try {
        const userName = this.db.getUserNamebyUserId(userId);
        catcher.removeUserAndPass(userName);
        resolve({ success: true, message: "logout success" });
      } catch (error) {
        reject({ success: false, message: "logout failed" });
      }
    });
  }
}

module.exports = {
  SessionHandler,
};
