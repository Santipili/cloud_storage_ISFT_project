const fs = require("fs");
const path = require("path");

class DirectoryHandler {
  constructor() {

  }

  create(requestData, uploadDir) {
      const userDir = requestData.userDir;
      const newDir = requestData.newDir;
      const currentDir = path.resolve(__dirname, "../..");
      const newDirPath = path.join(currentDir, uploadDir, userDir, newDir);
    
      return new Promise((resolve, reject) => {
        if (!fs.existsSync(newDirPath)) {
          fs.mkdirSync(newDirPath, { recursive: true }, (error) => {
            if (error) {
              reject({ status: false, message: "No se pudo crear el directorio" });
            } else {
              resolve({ status: true, message: "Directorio creado exitosamente" });
            }
          });
        } else {
          reject({ status: false, message: "El directorio ya existe" });
        }
      });
    }

    delete(){

    }

    rename(){

    }
    
    move(){

    }

    getContent(){

    }

    copy(){

    }

    getProperties(){

    }
}

module.exports = { DirectoryHandler };
