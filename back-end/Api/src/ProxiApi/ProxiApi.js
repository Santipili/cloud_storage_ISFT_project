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
    const filesHandler = new FilesHandler();
    filesHandler.delete(uploadDir, fileName);
  }

  uploadFileName(currentName, newName) {
    const filesHandler = new FilesHandler();
    filesHandler.rename(currentName, newName);
  }

  createDirectory = async (req, res) => {
    const sessionUserId = req.headers["x-user-id"];
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
    const sessionUserId = req.headers["x-user-id"];
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

  renameDirectory = async (req, res) => {
    const sessionUserId = req.headers["x-user-id"];
    const startPath = path.resolve(__dirname, "../..");
    const userDirPath = path.join(startPath, this.uploadDir, sessionUserId);

    let body = "";
    req.on("data", async (chunk) => {
      body += chunk.toString();
      const requestData = body ? JSON.parse(body) : {};
      const renamePath = path.join(userDirPath, requestData.renameDir);
      const newNamePath = path.join(userDirPath, requestData.newNameDir);
      try {
        const response = await this.directoryHandler.rename(
          renamePath,
          newNamePath
        );
        console.log(response);
        return res.end(JSON.stringify({ status: true, message: response }));
      } catch (e) {
        res.statusCode = 500;
        return res.end(JSON.stringify({ status: false, message: e.message }));
      }
    });
  };

  listDirectory = async (req, res) => {
    const UserId = req.headers["user-id"];

    const startPath = path.resolve(__dirname, "../..");

    const userDirPath = path.join(startPath, this.uploadDir, UserId);

    let body = "";
    req.on("data", async (chunk) => {
      body += chunk.toString();
      const requestData = body ? JSON.parse(body) : {};

      const toListDirPath = path.join(userDirPath, requestData);
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

  getDirProperties = async (req, res) => {
    const sessionUserId = req.headers["x-user-id"];
    const startPath = path.resolve(__dirname, "../..");
    const userDirPath = path.join(startPath, this.uploadDir, sessionUserId);

    let body = "";
    req.on("data", async (chunk) => {
      body += chunk.toString();
      const requestData = body ? JSON.parse(body) : {};
      const propertiesDirPath = path.join(
        userDirPath,
        requestData.propertiesDir
      );
      try {
        const response = await this.directoryHandler.getProperties(
          propertiesDirPath
        );
        console.log(response);
        return res.end(JSON.stringify({ status: true, properties: response }));
      } catch (e) {
        res.statusCode = 500;
        return res.end(JSON.stringify({ status: false, message: e.message }));
      }
    });
  };
}

module.exports = { ProxiApi };
