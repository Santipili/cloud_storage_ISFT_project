const fs = require("fs");
const multiparty = require("multiparty");
const path = require("path");

class FilesHandler {
  constructor() {}

  upload = (req, uploadDir) => {
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

        if (JSON.stringify(files) !== "{}" && files != undefined) {
          files.file.forEach((file) => {
            const fileName = file.originalFilename;
            const currentDir = __dirname;

            const parentDir = path.resolve(currentDir, "../../..");

            const filePath = path.join(parentDir, uploadDir, fileName);
            const fileCurrentPath = file.path;

            this.__writeFilePath(fileCurrentPath, filePath);
          });
          resolve({ status: true, message: "File upload" });
        }

        reject({ status: false, message: "empty data files" });
      });
    });
  };

  download = async (filePath) => {
    // const basePath = "uploads";
    // const fileToDownload = path.join(basePath, fileName)
    
    return new Promise((resolve, reject) => {
      console.log(fs.existsSync(filePath))
      if (!fs.existsSync(filePath)) {

        reject({ status: false, message: "Error al encontrar el archivo" });
      }
      else {

        let FileName = path.basename(filePath);
        
        
        fs.readFile(filePath, (readErr, Data) => {
          if (readErr) {
            
            reject({ status: false, message: "File not found" });

          } else {
            
            resolve({ status: true, data: Data, fileName: FileName });
          }
        });
      }
    }) 

  };

  __writeFilePath(currentPath, uploadedPath) {
    fs.readFile(currentPath, (readErr, data) => {
      if (readErr) {
        console.error("Error al leer el archivo:", readErr);
        throw new Error("Erro al leer el arhivo");
      } else {
        fs.writeFile(uploadedPath, data, (writeErr) => {
          console.log(uploadedPath);
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

  delete(filePath) {
    fs.unlink(filePath, (error) => {
      if (error) {
        console.error("Error al eliminar el archivo:", error);
      } else {
        console.log("Archivo eliminado con éxito:", filePath);
      }
    });
  }

  rename(currentPath, newPath) {
    const basePath = "uploads";

    const absoluteCurrentPath = path.join(basePath, currentPath);
    const absoluteNewPath = path.join(basePath, newPath);

    fs.rename(absoluteCurrentPath, absoluteNewPath, (error) => {
      if (error) {
        console.error("Error al renombrar el archivo:", error);
      } else {
        console.log("Archivo renombrado con éxito a", newPath);
      }
    });
  }

  move(srcPath, destPath) {
    const basePath = "uploads";

    const absoluteSrcPath = path.join(basePath, srcPath);
    const absoluteDestPath = path.join(basePath, destPath);

    fs.rename(absoluteSrcPath, absoluteDestPath, (error) => {
      if (error) {
        console.error("Error al mover el archivo:", error);
      } else {
        console.log("Archivo movido con éxito a", destPath);
      }
    });
  }
  copy(srcPath, destPath) {
    const basePath = "uploads";

    const absoluteSrcPath = path.join(basePath, srcPath);
    const absoluteDestPath = path.join(basePath, destPath);

    fs.copyFile(absoluteSrcPath, absoluteDestPath, (error) => {
      if (error) {
        console.error("Error al copiar el archivo:", error);
      } else {
        console.log("Archivo copiado con éxito a", destPath);
      }
    });
  }

  getProperties(filePath) {
    const basePath = "uploads";

    const absoluteFilePath = path.join(basePath, filePath);

    fs.stat(absoluteFilePath, (error, stats) => {
      if (error) {
        console.error("Error al obtener propiedades del archivo:", error);
      } else {
        console.log("Propiedades del archivo:", stats);
      }
    });
  }
}

module.exports = { FilesHandler };
