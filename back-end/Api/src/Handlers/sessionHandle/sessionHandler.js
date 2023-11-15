const { DataBase } = require("../../DB/DB.js");
const { catcher } = require("../../cacher/cacher.js");
const {
  DirectoryHandler,
} = require("../../Handlers/DirectoryHandler/DirectoryHandler");

const path = require("path");

const fs = require("fs");

// Lee el contenido del archivo config.json
const configRaw = fs.readFileSync("config.json");
const config = JSON.parse(configRaw);

class SessionHandler {
  constructor() {
    this.db = new DataBase();
    this.directoryHandler = new DirectoryHandler();
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

  async signUp(data) {
    try {
      await this.db.insertUser(data);
      catcher.setCachedUserAndPass(data.userName, data.password);

      const userId = this.db.getuserIdByUserName(data.userName);
      const id = String(userId);

      const startPath = path.resolve(__dirname, "../../..");
      try {
        const userDirPath = path.join(startPath, config.api.basePath, id);

        await this.directoryHandler.create(userDirPath);

        return { state: true, message: "sign up success" };
      } catch (error) {
        console.log(error);
        return { state: false, message: "the user already exists" };
      }
    } catch (error) {
      console.log(error);
      return { state: false, message: "sign up failed" };
    }
  }
}
module.exports = {
  SessionHandler,
};
