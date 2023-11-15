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
  insertUser(data) {
    return new Promise((resolve, reject) => {
      try {
        const user = {
          userId: this.UsersAndPasswords.length + 1,
          userName: data.userName,
          password: data.password,
        };

        this.UsersAndPasswords.push(user);
        resolve(true);
      } catch (error) {
        console.log(error);
        reject(false);
      }
    });
  }
}

module.exports = { DataBase };
