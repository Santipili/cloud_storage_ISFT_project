const fs = require("fs");
const path = require("path");

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

  rename(renamePath, newPath) {
    console.log(renamePath);
    console.log(newPath);
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

  listContent(toListDir){
    console.log(toListDir);
    return new Promise((resolve, reject) => {
      if (fs.existsSync(toListDir)) {
        fs.readdir(toListDir, (error, filesList) => {
          if (error) {
            console.error('Error al leer el directorio:', error);
            reject({ status: false, message: "Error al leer el directorio" });
          }           
          resolve(filesList);

        });
      } else {
        reject({ status: false, message: "La ruta del directorio no existe!" });
      }
    });
  }

  getProperties(Dir){
    console.log(Dir);
    return new Promise((resolve, reject) => {
      if (fs.existsSync(Dir)) {
        let propertiesDir = {};
        let foldersCount = -1;
        let filesCount = 0;
        let totalSize = 0;
        
        const stack = [Dir];
        while (stack.length > 0) {
          const currentPath = stack.pop();
          let stats = fs.statSync(currentPath);
          if (stats.isFile()) {
            totalSize += stats.size;
            filesCount += 1;
          } else if (stats.isDirectory()) {
            foldersCount += 1;
            let subFiles = fs.readdirSync(currentPath);
            subFiles.forEach((subFile) => {
              let subFilePath = path.join(currentPath, subFile);
              stack.push(subFilePath);
            })
          }
        }
        
        propertiesDir['lastTimeMod'] = fs.statSync(Dir).mtime;
        propertiesDir['totalfiles'] = filesCount;
        propertiesDir['totalfolders'] = foldersCount;
        propertiesDir['totalSize'] = totalSize;
        resolve(propertiesDir);
      }
      else {
        reject({ status: false, message: "La ruta del directorio no existe!" });
      }
    });
  }

  move(requestData){
    
    
  }
  copy(requestData){
    


  }
}
              
module.exports = { DirectoryHandler };