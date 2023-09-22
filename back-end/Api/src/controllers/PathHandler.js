const fs = require("fs");
const path = require("path");

class PathHandler {
  constructor() {

  }

  createDirectory(requestData, uploadDir) {
    console.log(requestData); // vacia??
      const userDir = requestData.userDir;
      const newDir = requestData.newDir;
      const currentDir = path.resolve(__dirname, "../..");

      console.log(currentDir +"  "+ userDir +"  " +newDir);
      // desde el front tengo q enviar en el body de la request: el nombre de usuario(luego sera un hash) y la nueva ruta creada
      const newDirPath = path.join(currentDir, uploadDir, userDir, newDir);
      console.log(newDirPath);
    
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
    

}

module.exports = { PathHandler };
