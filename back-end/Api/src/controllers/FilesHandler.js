const fs = require("fs");
const multiparty = require("multiparty");
const path = require("path");

class FilesHandler {
  constructor() {}

  uploadFiles(req, uploadDir) {
    return new Promise((resolve, reject) => {
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
        console.log(`se creo ${uploadDir}`);
      }
      const form = new multiparty.Form();
      form.parse(req, (err, fields, files) => {
        if (err) {
          console.error(err);
          console.log("error");
          reject({ status: false });
        }

        files.file.forEach((file) => {
          const fileName = file.originalFilename;
          const currentDir = __dirname;
          const parentDir = path.resolve(currentDir, "../..");
          const filePath = path.join(parentDir, uploadDir, fileName);
          const fileCurrentPath = file.path;
          this.writePath(fileCurrentPath, filePath);
        });

        resolve({ status: true, message: "File upload" });
      });
    });
  }

  writePath(currentPath, uploadedPath) {
    fs.readFile(currentPath, (readErr, data) => {
      if (readErr) {
        console.error("Error al leer el archivo:", readErr);
        throw new Error("Erro al leer el arhivo");
      } else {
        fs.writeFile(uploadedPath, data, (writeErr) => {
          if (writeErr) {
            console.error("Error al escribir el archivo:", writeErr);
            throw new Error("Erro al leer el arhivo");
          } else {
            console.log("Archivo escrito con éxito:", uploadedPath);
          }
        });
      }
    });
  }
}

module.exports = { FilesHandler };
