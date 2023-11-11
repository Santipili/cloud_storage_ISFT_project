const { DataBase } = require("../DB/DB.js");

class Catcher {
  constructor() {
    this.db = new DataBase();
    this.userNameAndPassword = new Map();

    this.__setUserAndPass();
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

  __setUserAndPass() {
    this.db.getUsersAndPasswords().forEach(({ userName, password }) => {
      this.setUserNameAndPass(userName, password);
    });
  }
}

const catcher = new Catcher();

module.exports = { catcher };
