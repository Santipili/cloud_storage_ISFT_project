const path = require("path");

class ProxiApi {
  constructor(uploadDirReference, fileHandler, directoryHandler) {
    this.uploadDir = uploadDirReference;
    this.fileHandler = fileHandler;
    this.directoryHandler = directoryHandler;
  }

  uploadFiles = async (req, res) => {
    try {
      const sessionUserId = req.headers["user-id"];

      const response = await this.fileHandler.upload(
        req,
        this.uploadDir + "/" + sessionUserId
      );
      console.log("here");
      return res.end(JSON.stringify({ status: true, message: response }));
    } catch (e) {
      console.log(e);
      res.statusCode = 500;
      return res.end(JSON.stringify({ status: false, message: e.message }));
    }
  };

  downloadFile = async (req, res) => {

    const userId = req.headers["user-id"];
    const startPath = path.resolve(__dirname, "../..");
    const userDirPath = path.join(startPath, this.uploadDir,userId);

    let body = "";
    req.on("data", async (chunk) => {
      body += chunk.toString();
      const requestData = body ? JSON.parse(body) : {};
      const filePath = path.join(userDirPath, requestData.file);
      try {
        let response = await this.fileHandler.download(filePath);
  
        if (response.status){
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
          res.setHeader('Access-Control-Allow-Headers', 'content-type, session-token, user-id, file-name, Content-disposition');
          res.setHeader('Content-Type', 'application/json');
          res.setHeader('Content-Disposition', `attachment; filename=${response.fileName}`);
          
            
          res.statusCode = 200;
            // res.writeHead(200, headers);
            console.log(response.data);
            res.end(JSON.stringify(response));
        }
  
      } catch (e) {
        console.log(e);
        res.statusCode = 500;
        return res.end(JSON.stringify({ status: false, message: e.message }));
      }
    })

  }

  deleteFile(uploadDir, fileName) {
    const filesHandler = new FilesHandler();
    filesHandler.delete(uploadDir, fileName);
  }

  uploadFileName(currentName, newName) {
    const filesHandler = new FilesHandler();
    filesHandler.rename(currentName, newName);
  }

  createDirectory = async (req, res) => {
    const sessionUserId = req.headers["user-id"];
    const startPath = path.resolve(__dirname, "../..");
    const userDirPath = path.join(startPath, this.uploadDir, sessionUserId);

    let body = "";
    req.on("data", async (chunk) => {
      body += chunk.toString();
      const requestData = body ? JSON.parse(body) : {};
      const newDirPath = path.join(userDirPath, requestData);
      try {
        const response = await this.directoryHandler.create(newDirPath);

        return res.end(JSON.stringify({ status: true, message: response }));
      } catch (e) {
        res.statusCode = 500;
        return res.end(JSON.stringify({ status: false, message: e.message }));
      }
    });
  };

  deleteDirectory = async (req, res) => {
    const sessionUserId = req.headers["user-id"];
    const startPath = path.resolve(__dirname, "../..");
    const userDirPath = path.join(startPath, this.uploadDir, sessionUserId);

    let body = "";
    req.on("data", async (chunk) => {
      body += chunk.toString();
      const requestData = body ? JSON.parse(body) : {};

      const toDeleteDirPath = path.join(userDirPath, requestData);
      try {
        const response = await this.directoryHandler.delete(toDeleteDirPath);

        return res.end(JSON.stringify({ status: true, message: response }));
      } catch (e) {
        res.statusCode = 500;
        return res.end(JSON.stringify({ status: false, message: e.message }));
      }
    });
  };

  renameDirectory = async (req, res) => {
    const sessionUserId = req.headers["user-id"];
    const startPath = path.resolve(__dirname, "../..");
    const userDirPath = path.join(startPath, this.uploadDir, sessionUserId);

    let body = "";
    req.on("data", async (chunk) => {
      body += chunk.toString();
      const requestData = body ? JSON.parse(body) : {};
      const renamePath = path.join(userDirPath, requestData.oldName);
      const newNamePath = path.join(userDirPath, requestData.newName);
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

        return res.end(JSON.stringify({ status: true, files: response }));
      } catch (e) {
        res.statusCode = 500;
        return res.end(JSON.stringify({ status: false, message: e.message }));
      }
    });
  };

  listContentTree = async (req, res) => {
    const sessionUserId = req.headers["user-id"];
    const startPath = path.resolve(__dirname, "../..");
    const userDirPath = path.join(startPath, this.uploadDir, sessionUserId);

    let body = "";
    req.on("data", async (chunk) => {
      body += chunk.toString();
      const requestData = body ? JSON.parse(body) : {};

      const toListDirPath = path.join(userDirPath, requestData);
      try {
        const response = await this.directoryHandler.listContentTree(
          toListDirPath
        );

        return res.end(JSON.stringify({ status: true, files: response }));
      } catch (e) {
        res.statusCode = 500;
        return res.end(JSON.stringify({ status: false, message: e.message }));
      }
    });
  };

  getDirProperties = async (req, res) => {
    const sessionUserId = req.headers["user-id"];
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

  copyDirectory = async (req, res) => {
    const userId = req.headers["user-id"];
    const startPath = path.resolve(__dirname, "../..");
    const userDirPath = path.join(startPath, this.uploadDir, userId);

    let body = "";
    req.on("data", async (chunk) => {
      body += chunk.toString();
      const requestData = body ? JSON.parse(body) : {};
      const originDirPath = path.join(userDirPath, requestData.originDir);
      const newDirPath = path.join(userDirPath, requestData.newDir);
      try {
        const response = await this.directoryHandler.copy(
          originDirPath,
          newDirPath
        );
        console.log(response);
        return res.end(
          JSON.stringify({ status: true, message: response.message })
        );
      } catch (e) {
        res.statusCode = 500;
        return res.end(JSON.stringify({ status: false, message: e.message }));
      }
    });
  };

  moveDirectory = async (req, res) => {
    const userId = req.headers["user-id"];
    const startPath = path.resolve(__dirname, "../..");
    const userDirPath = path.join(startPath, this.uploadDir, userId);

    let body = "";
    req.on("data", async (chunk) => {
      body += chunk.toString();
      const requestData = body ? JSON.parse(body) : {};
      console.log(requestData);
<<<<<<< HEAD
      const originDirPath = path.join(userDirPath, requestData.originPath);
=======
      const originDirPath = path.join(userDirPath, requestData.path);
>>>>>>> main
      const newDirPath = path.join(userDirPath, requestData.destinationPath);

      try {
        const response = await this.directoryHandler.move(
          originDirPath,
          newDirPath
        );
        console.log(response);
        return res.end(
          JSON.stringify({ status: true, message: response.message })
        );
      } catch (e) {
        res.statusCode = 500;
        return res.end(JSON.stringify({ status: false, message: e.message }));
      }
    });
  };
}

module.exports = { ProxiApi };
