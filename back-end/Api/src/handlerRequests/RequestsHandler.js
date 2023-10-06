const { FilesHandler } = require("../FilesHandler/FilesHandler.js");
const { DirectoryHandler } = require("../DirectoryHandler/DirectoryHandler.js");

class RequestsHandler {
  constructor(fileHandler) {
    this.fileHandler = fileHandler;
  }

  uploadFiles = async (req, res) => {
    try {
      const response = await this.fileHandler.upload(req, "uploads");
      return res.end(JSON.stringify({ status: true, message: response }));
    } catch (e) {
      console.log(e);
      res.statusCode = 500;
      return res.end(JSON.stringify({ status: false, message: e.message }));
    }
  };
  deleteFile(uploadDir, fileName) {
    const filesHandler = new FilesHandler();
    filesHandler.delete(uploadDir, fileName);
  }

  uploadFileName(currentName, newName) {
    const filesHandler = new FilesHandler();
    filesHandler.rename(currentName, newName);
  }

  createDirectory = async (req, res) => {
    const pathHandler = new DirectoryHandler();
    let body = "";
    req.on("data", async (chunk) => {
      body += chunk.toString();
      const requestData = body ? JSON.parse(body) : {};

      try {
        const response = await pathHandler.create(requestData, this.uploadDir);
        console.log(response);
        return res.end(JSON.stringify({ status: true, message: response }));
      } catch (e) {
        res.statusCode = 500;
        return res.end(JSON.stringify({ status: false, message: e.message }));
      }
    });
  };

  deleteDirectory = async (req, res) => {
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

module.exports = { RequestsHandler };
