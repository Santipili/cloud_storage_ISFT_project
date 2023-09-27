const { FilesHandler } = require("../controllers/FilesHandler.js");
const { DirectoryHandler } = require("../controllers/DirectoryHandler.js");


class RequestsHandler {
  constructor(uploadDirReference) {
    this.uploadDir = uploadDirReference;

  }

   uploadFiles=async (req, res) =>{
    const filesHandler = new FilesHandler();
    try {
      const response = await filesHandler.uploadFiles(req, this.uploadDir);
      return res.end(JSON.stringify({ status: true, message: response }));
    } catch (e) {
      res.statusCode = 500;
      return res.end(JSON.stringify({ status: false, message: e.message }));
    }
  }

   createDirectory=async (req, res)=> {
   
    const pathHandler = new DirectoryHandler();
    let body = '';
    req.on('data', async (chunk) => {
        body += chunk.toString();
        const requestData = body ? JSON.parse(body) : {};
    
        try{
          const response = await pathHandler.create(requestData, this.uploadDir);
          console.log(response);
          return res.end(JSON.stringify({ status: true, message: response }));
        } catch(e) {
          res.statusCode = 500;
          return res.end(JSON.stringify({ status: false, message: e.message }));
        }
    });
  }


}

module.exports = { RequestsHandler };
