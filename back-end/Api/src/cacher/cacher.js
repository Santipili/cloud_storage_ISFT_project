const { DataBase } = require("../DB/DB.js");
const {
  DirectoryHandler,
} = require("../Handlers/DirectoryHandler/DirectoryHandler.js");
const path = require("path");
const fs = require("fs");

const configRaw = fs.readFileSync("config.json");
const config = JSON.parse(configRaw);

class Catcher {
  constructor() {
    this.db = new DataBase();
    this.userNameAndPassword = new Map();
    this.directoryHandler = new DirectoryHandler();
  }

  getCachedUserAndPass() {
    return this.userNameAndPassword;
  }

  setUserNameAndPass(userName, password) {
    this.userNameAndPassword.set(userName, password);
  }

  removeUserAndPass(userName) {
    this.userNameAndPassword.delete(userName);
  }

  __initializeData() {
    const users = this.db.getUsersAndPasswords();
    users.forEach(({ userName, password }) => {
      this.setUserNameAndPass(userName, password);
    });
    users.forEach(async ({ userId }) => {
      const startPath = path.resolve(__dirname, "../../..");
      const userDirPath = path.join(
        startPath,
        config.api.basePath,
        String(userId)
      );
      try {
        await this.directoryHandler.create(userDirPath);
      } catch (error) {
        console.log(error);
      }
    });
  }

  setCachedUserAndPass(userName, password) {
    this.setUserNameAndPass(userName, password);
  }
}

const catcher = new Catcher();
catcher.__initializeData();

module.exports = { catcher };
