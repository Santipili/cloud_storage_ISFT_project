const fs = require("fs");
const multiparty = require("multiparty");
const path = require("path");

class FilesHandler {
  constructor() {}

  upload(req, uploadDir) {
    return new Promise((resolve, reject) => {
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
      }
      const form = new multiparty.Form();
      form.parse(req, (err, fields, files) => {
        if (err) {
          console.error(err);
          reject({ status: false });
        }

        if (JSON.stringify(files) !== "{}") {
          files.file.forEach((file) => {
            const fileName = file.originalFilename;
            const currentDir = __dirname;
            const parentDir = path.resolve(currentDir, "../..");
            const filePath = path.join(parentDir, uploadDir, fileName);
            const fileCurrentPath = file.path;
            this.__writeFilePath(fileCurrentPath, filePath);
          });
          resolve({ status: true, message: "File upload" });
        }

        reject({ status: false, message: "empty data files" });
      });
    });
  }

  __writeFilePath(currentPath, uploadedPath) {
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

  delete(fileName) {
    fs.unlink("./uploads/" + fileName, (error) => {
      if (error) {
        console.error("Error al eliminar el archivo:", error);
      } else {
        console.log("Archivo eliminado con exito", fileName);
      }
    });
  }
  rename(currentName, newName) {
    fs.rename("./uploads/" + currentName, "./uploads/" + newName, (error) => {
      if (error) {
        console.error("Error al renombrar el archivo:", error);
      } else {
        console.log("Archivo renombrado con exito", newName);
      }
    });
  }
  move() {}
  copy() {}
  getProperties() {}
}

module.exports = { FilesHandler };
