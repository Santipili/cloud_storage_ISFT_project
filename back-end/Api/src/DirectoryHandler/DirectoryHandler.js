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

    delete(requestData, uploadDir){
      // Esto se deberia encargar otro!!! directamente pasar la ruta del directorio a borrar o crear
      const userDir = requestData.userDir;
      const toDeleteDir = requestData.newDir;
      const currentDir = path.resolve(__dirname, "../..");
      const toDeleteDirPath = path.join(currentDir, uploadDir, userDir, toDeleteDir);
      console.log(toDeleteDirPath);
    
      return new Promise((resolve, reject) => {
        if (fs.existsSync(toDeleteDirPath)) {
          fs.rmdirSync(toDeleteDirPath, { recursive: true });
          resolve({ status: true, message: "Directorio eliminado correctamente" });

        } else {
          reject({ status: false, message: "La ruta del directorio no existe!" });
        }
      });

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
