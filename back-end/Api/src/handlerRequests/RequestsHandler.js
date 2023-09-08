const { FilesHandler } = require("../controllers/FilesHandler.js");

class RequestsHandler {
  constructor() {}

  async uploadFiles(req, res) {
    const uploadDir = "./uploads";
    const filesHandler = new FilesHandler();

    const response = await filesHandler.uploadFiles(req, uploadDir);
    console.log("resopnse");
    console.log(response);

    res.end(JSON.stringify({ status: true, message: response }));
  }
}

module.exports = { RequestsHandler };
