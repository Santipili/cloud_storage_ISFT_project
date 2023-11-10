class DataBase {
  constructor() {
    this.UsersAndPasswords = [
      { userId: 1, userName: "root", password: "1234" },
      { userId: 2, userName: "user", password: "1234" },
    ];
  }
  getuserIdByUserName(userName) {
    const user = this.UsersAndPasswords.find(
      (user) => user.userName === userName
    );
    if (user) {
      return user.userId;
    }
  }
  getUsersAndPasswords() {
    return this.UsersAndPasswords;
  }
  getUserNamebyUserId(userId) {
    const user = this.UsersAndPasswords.find((user) => user.userId === userId);
    if (user) {
      return user.userName;
    }
  }
}

module.exports = { DataBase };
