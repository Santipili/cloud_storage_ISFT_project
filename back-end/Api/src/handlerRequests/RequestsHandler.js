const { FilesHandler } = require("../controllers/FilesHandler.js");
const { PathHandler } = require("../controllers/PathHandler.js");


class RequestsHandler {
  constructor(uploadDirReference) {
    this.uploadDir = uploadDirReference;
  }

  async uploadFiles(req, res) {
    // const uploadDir = "./uploads";
    const filesHandler = new FilesHandler();
    try {
      const response = await filesHandler.uploadFiles(req, this.uploadDir);
      return res.end(JSON.stringify({ status: true, message: response }));
    } catch (e) {
      res.statusCode = 500;
      return res.end(JSON.stringify({ status: false, message: e.message }));
    }
  }

  async createDirectorie(req, res) {
    const pathHandler = new PathHandler();
    let body = '';
    req.on('data', (chunk) => {
        body += chunk.toString();
    });
    const requestData = body ? JSON.parse(body) : {};
    
    console.log(req.body);
    console.log("BODY: "+body);


    try{
      const response = await pathHandler.createDirectory(requestData, "/descargas");
      return res.end(JSON.stringify({ status: true, message: response }));
    } catch(e) {
      res.statusCode = 500;
      return res.end(JSON.stringify({ status: false, message: e.message }));
    }
  }


}

module.exports = { RequestsHandler };
