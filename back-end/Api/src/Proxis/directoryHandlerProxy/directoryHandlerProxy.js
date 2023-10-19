const {
  DirectoryHandler,
} = require("../../Handlers/DirectoryHandler/DirectoryHandler.js");

class DirectoryHandlerProxy {
  constructor() {}

  create = async (req, res) => {
    const directoryHandler = new DirectoryHandler();
    let body = "";
    req.on("data", async (chunk) => {
      body += chunk.toString();
      const requestData = body ? JSON.parse(body) : {};

      try {
        const response = await directoryHandler.create(
          requestData,
          this.uploadDir
        );
        console.log(response);
        return res.end(JSON.stringify({ status: true, message: response }));
      } catch (e) {
        res.statusCode = 500;
        return res.end(JSON.stringify({ status: false, message: e.message }));
      }
    });
  };

  delete = async (req, res) => {
    const pathHandler = new DirectoryHandler();
    let body = "";
    req.on("data", async (chunk) => {
      body += chunk.toString();
      const requestData = body ? JSON.parse(body) : {};

      try {
        const response = await pathHandler.delete(requestData, this.uploadDir);
        console.log(response);
        return res.end(JSON.stringify({ status: true, message: response }));
      } catch (e) {
        res.statusCode = 500;
        return res.end(JSON.stringify({ status: false, message: e.message }));
      }
    });
  };
}

module.exports = { DirectoryHandlerProxy };
