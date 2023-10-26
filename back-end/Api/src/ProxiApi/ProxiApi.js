const path = require("path");

class ProxiApi {
  constructor(uploadDirReference, fileHandler, directoryHandler) {
    this.uploadDir = uploadDirReference;
    this.fileHandler = fileHandler;
    this.directoryHandler = directoryHandler;
  }

  uploadFiles = async (req, res) => {
    try {
      const response = await this.fileHandler.upload(req, this.uploadDir);
      return res.end(JSON.stringify({ status: true, message: response }));
    } catch (e) {
      console.log(e);
      res.statusCode = 500;
      return res.end(JSON.stringify({ status: false, message: e.message }));
    }
  };

  deleteFile(uploadDir, fileName) {
    this.filesHandler.delete(uploadDir, fileName);
  }

  uploadFileName(currentName, newName) {
    this.filesHandler.rename(currentName, newName);
  }

  renameDirectory = async (req, res) => {
    const pathHandler = this.directoryHandler;
    let body = "";
    req.on("data", async (chunk) => {
      body += chunk.toString();
      const requestData = body ? JSON.parse(body) : {};

      try {
        const response = await pathHandler.rename(requestData, this.uploadDir);
        console.log(response);
        return res.end(JSON.stringify({ status: true, message: response }));
      } catch (e) {
        res.statusCode = 500;
        return res.end(JSON.stringify({ status: false, message: e.message }));
      }
    });
  };

  createDirectory = async (req, res) => {
    // const sessionToken = req.header('x-session-token');
    const sessionUserId = req.headers["x-session-user-id"];
    const startPath = path.resolve(__dirname, "../..");
    const userDirPath = path.join(startPath, this.uploadDir, sessionUserId);

    let body = "";
    req.on("data", async (chunk) => {
      body += chunk.toString();
      const requestData = body ? JSON.parse(body) : {};
      const newDirPath = path.join(userDirPath, requestData.newDir);
      try {
        const response = await this.directoryHandler.create(newDirPath);
        console.log(response);
        return res.end(JSON.stringify({ status: true, message: response }));
      } catch (e) {
        res.statusCode = 500;
        return res.end(JSON.stringify({ status: false, message: e.message }));
      }
    });
  };

  deleteDirectory = async (req, res) => {
    const sessionUserId = req.headers["x-session-user-id"];
    const startPath = path.resolve(__dirname, "../..");
    const userDirPath = path.join(startPath, this.uploadDir, sessionUserId);

    let body = "";
    req.on("data", async (chunk) => {
      body += chunk.toString();
      const requestData = body ? JSON.parse(body) : {};
      const toDeleteDirPath = path.join(userDirPath, requestData.toDeleteDir);
      try {
        const response = await this.directoryHandler.delete(toDeleteDirPath);
        console.log(response);
        return res.end(JSON.stringify({ status: true, message: response }));
      } catch (e) {
        res.statusCode = 500;
        return res.end(JSON.stringify({ status: false, message: e.message }));
      }
    });
  };

  listDirectory = async (req, res) => {
    const sessionUserId = req.headers["x-session-user-id"];
    const startPath = path.resolve(__dirname, "../..");
    const userDirPath = path.join(startPath, this.uploadDir, sessionUserId);

    let body = "";
    req.on("data", async (chunk) => {
      body += chunk.toString();
      const requestData = body ? JSON.parse(body) : {};
      const toListDirPath = path.join(userDirPath, requestData.toListDir);
      try {
        const response = await this.directoryHandler.listContent(toListDirPath);
        console.log(response);
        return res.end(JSON.stringify({ status: true, files: response }));
      } catch (e) {
        res.statusCode = 500;
        return res.end(JSON.stringify({ status: false, message: e.message }));
      }
    });
  };
}

module.exports = { ProxiApi };
