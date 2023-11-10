const {
  SessionHandler,
} = require("../Handlers/sessionHandle/sessionHandler.js");

class ProxiAccounting {
  constructor() {
    this.sessionHandler = new SessionHandler();
  }

  login = async (req, res) => {
    try {
      let body = "";
      req.on("data", async (chunk) => {
        body += chunk.toString();
        const requestData = body ? JSON.parse(body) : {};

        const response = await this.sessionHandler.login(
          requestData.userName,
          requestData.password
        );

        if (response.status == true) {
          return res.end(JSON.stringify(response));
        } else {
          res.statusCode = 500;
          return res.end(
            JSON.stringify({
              status: false,
              message: "Error al iniciar sesión",
            })
          );
        }
      });
    } catch (error) {
      res.statusCode = 500;
      return res.end(
        JSON.stringify({
          status: false,
          message: "Error al procesar la solicitud",
        })
      );
    }
  };

  logout = async (req, res) => {
    const sessionUserId = req.headers["user-id"];
    console.log(sessionUserId);
    try {
      const response = await this.sessionHandler.logout(sessionUserId);
      console.log(response);
      return res.end(JSON.stringify({ status: true, message: response }));
    } catch (e) {
      res.statusCode = 500;
      return res.end(
        JSON.stringify({ status: false, message: "error to logout" })
      );
    }
  };
}

module.exports = { ProxiAccounting };
