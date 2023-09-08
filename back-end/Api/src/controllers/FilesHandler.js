const fs = require("fs");
const multiparty = require("multiparty");
const path = require("path");

class FilesHandler {
  constructor() {}

  uploadFiles(req, uploadDir) {
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
      console.log(`se creo ${uploadDir}`);
    }
    const form = new multiparty.Form();

    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error(err);
        console.log("error");
        return "Internal Server Error";
      }

      files.file.forEach((file) => {
        const fileName = file.originalFilename;

        const currentDir = __dirname;
        const parentDir = path.resolve(currentDir, "../..");

        const filePath = path.join(parentDir, uploadDir, fileName);

        const fileCurrentPath = file.path;
        this.writePath(fileCurrentPath, filePath);
      });
    });
    return "files uploaded";
  }

  writePath(currentPath, uploadedPath) {
    fs.readFile(currentPath, (readErr, data) => {
      if (readErr) {
        console.error("Error al leer el archivo:", readErr);
      } else {
        fs.writeFile(uploadedPath, data, (writeErr) => {
          if (writeErr) {
            console.error("Error al escribir el archivo:", writeErr);
          } else {
            console.log("Archivo escrito con éxito:", uploadedPath);
          }
        });
      }
    });
  }
}

module.exports = { FilesHandler };
