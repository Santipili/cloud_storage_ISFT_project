const { FilesHandler } = require("../../Handlers/FilesHandler/FilesHandler.js");

class FilesHandlerProxy {
  constructor(fileHandler) {
    this.fileHandler = fileHandler;
  }

  upload = async (req, res) => {
    try {
      const response = await this.fileHandler.upload(req, "uploads");
      if (response.status == true) {
        return res.end(
          JSON.stringify({ status: true, message: response.message })
        );
      } else if (response.status == false) {
        res.statusCode = 500;
        return res.end(
          JSON.stringify({ status: false, message: response.message })
        );
      }
    } catch (e) {
      console.log(e);
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
}

module.exports = { FilesHandlerProxy };
