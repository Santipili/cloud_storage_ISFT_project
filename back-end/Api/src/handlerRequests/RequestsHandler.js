class RequestsHandler {
  constructor(fileHandler) {
    this.fileHandler = fileHandler;
  }

  uploadFiles = async (req, res) => {
    const uploadDir = "./uploads";

    try {
      const response = await this.fileHandler.uploadFiles(req, uploadDir);
      return res.end(JSON.stringify({ status: true, message: response }));
    } catch (e) {
      console.log(e);
      res.statusCode = 500;
      return res.end(JSON.stringify({ status: false, message: e.message }));
    }
  };
  deleteFile = (uploadDir, fileName) => {
    this.filesHandler.deleteFile(uploadDir, fileName);
  };

  uploadFileName = (currentName, newName) => {
    this.filesHandler.uploadFileName(currentName, newName);
  };
}

module.exports = { RequestsHandler };
