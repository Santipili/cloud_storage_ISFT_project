class FileUploaderModel {
  constructor() {}

  logIn() {}

  async signIn(data) {
    if (data != null && data !== "") {
      try {
        let requestMetadata = {
          method: "POST",
          body: JSON.stringify(data),
        };

        let res = await fetch(
          "http://localhost:3000/UserHandler/signup",
          requestMetadata
        );
        res = await res.json();
        return res;
      } catch (error) {
        alert(error.message);
      }
    } else {
      console.log("error empty data");
    }
  }

  recoverPassword() {}
}

export { FileUploaderModel };
