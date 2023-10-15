const fs = require("fs");

class DirectoryHandler {
  constructor() {}


  create(newDir){
    console.log(newDir);
    return new Promise((resolve, reject) => {
      if (!fs.existsSync(newDir)) {
        fs.mkdirSync(newDir, { recursive: true });

        resolve({ status: true, message: "Directorio creado exitosamente" });
      } else {
        reject({ status: false, message: "El directorio ya existe" });
      }
    });
  }

  
  delete(toDeleteDir){
    console.log(toDeleteDir);
    return new Promise((resolve, reject) => {
      if (fs.existsSync(toDeleteDir)) {
        fs.rmdirSync(toDeleteDir, { recursive: true });
        resolve({ status: true, message: "Directorio eliminado correctamente" });

      } else {
        reject({ status: false, message: "La ruta del directorio no existe!" });
      }
    });
  }


  rename(requestData, uploadDir) {
    const userDir = requestData.userDir;
    const newName = requestData.newName;
    const currentDir = path.resolve(__dirname, "../..");
    const renamePath = path.join(currentDir, uploadDir, userDir);
    const newPath = path.join(currentDir, uploadDir, newName);
    console.log(renamePath);

    return new Promise((resolve, reject) => {
      if (fs.existsSync(renamePath)) {
        fs.renameSync(renamePath, newPath);
        resolve({
          status: true,
          message: "Directorio renombrado correctamente ",
              });
      } else {
        reject({ status: false, message: "La ruta del directorio no existe!" });
      }
    });
  }

  move(requestData){
      
  }
    
  listContent(toListDir){
    console.log(toListDir);
    return new Promise((resolve, reject) => {
      if (fs.existsSync(toListDir)) {
        fs.readdir(toListDir, (error, archivos) => {
          if (error) {
            console.error('Error al leer el directorio:', error);
            reject({ status: false, message: "Error al leer el directorio" });
          }           
          resolve(archivos);

        });
      } else {
        reject({ status: false, message: "La ruta del directorio no existe!" });
      }
    });
  }


  copy(requestData){

  }

  getProperties(requestData){

  }

}

module.exports = { DirectoryHandler };
