const { FilesHandler } = require("../controllers/FilesHandler.js");

class RequestsHandler {
  constructor() {}

  async uploadFiles(req, res) {
    const uploadDir = "./uploads";
    const filesHandler = new FilesHandler();
    try {
      const response = await filesHandler.uploadFiles(req, uploadDir);
      return res.end(JSON.stringify({ status: true, message: response }));
    } catch (e) {
      res.statusCode = 500;
      return res.end(JSON.stringify({ status: false, message: e.message }));
    }
  }
  deleteFile(uploadDir, fileName) {
    const filesHandler = new FilesHandler();
    filesHandler.deleteFile(uploadDir, fileName);
  }

  uploadFileName(currentName, newName) {
    const filesHandler = new FilesHandler();
    filesHandler.uploadFileName(currentName, newName);
  }
}

module.exports = { RequestsHandler };
