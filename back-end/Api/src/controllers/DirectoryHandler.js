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
      console.log(newDirPath);
    
      return new Promise((resolve, reject) => {
        if (!fs.existsSync(newDirPath)) {
          fs.mkdirSync(newDirPath, { recursive: true });
          resolve({ status: true, message: "Directorio creado exitosamente" });

        } else {
          reject({ status: false, message: "El directorio ya existe" });
        }
      });
    }

    delete(requestData){

    }

    rename(requestData){

    }
    
    move(requestData){

    }

    getContent(requestData){

    }

    copy(requestData){

    }

    getProperties(requestData){

    }
}

module.exports = { DirectoryHandler };
