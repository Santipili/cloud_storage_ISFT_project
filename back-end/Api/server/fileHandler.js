const {fileController} = require('../controller/fileController.js');

const multiparty = require("multiparty");
const path = require("path");



function uploadFileHandler(requestData, responseCallback){
    const uploadDir = '/uploads'
    const controller = new fileController(uploadDir);

    const form = new multiparty.Form();

        form.parse(requestData, (err, fields, files) => {
            if (err) {
            console.error(err);
            console.log("error");
            responseCallback(500, "Internal Server Error");
            }

        // Obtener la información del archivo

            files.file.forEach((file) => {
                const fileName = file.originalFilename;

                const currentDir = __dirname;
                const parentDir = path.resolve(currentDir, '..'); //voy una carpeta antes de server
                const filePath = path.join(parentDir, uploadDir, fileName);
                
                controller.uploadFile(file.path,filePath);
            });
            
            responseCallback(200, {message:"ok"});

        });
}

module.exports = {uploadFileHandler};