const fs = require("fs");
const path = require("path");
const fsx = require("fs-extra");

class DirectoryHandler {
  constructor() {}
  create(newDir) {
    return new Promise((resolve, reject) => {
      if (!fs.existsSync(newDir)) {
        fs.mkdirSync(newDir, { recursive: true });

        resolve({ status: true, message: "Directorio creado exitosamente" });
      } else {
        reject({ status: false, message: "El directorio ya existe" });
      }
    });
  }
  delete(toDeleteDir) {
    console.log(toDeleteDir);
    return new Promise((resolve, reject) => {
      if (fs.existsSync(toDeleteDir)) {
        fs.rmSync(toDeleteDir, { recursive: true });
        resolve({
          status: true,
          message: "Directorio eliminado correctamente",
        });
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

  listContent(toListDir) {
    console.log(toListDir);
    return new Promise((resolve, reject) => {
      if (fs.existsSync(toListDir)) {
        let tree = {};
        try {
          this.__buildTree(toListDir, tree).then(() => {
            resolve(tree);
          });
        } catch (err) {
          reject({ status: false, message: err });
          console.error(err);
        }
      } else {
        reject({ status: false, message: "La ruta del directorio no existe!" });
      }
    });
  }

  getProperties(dirPath) {
    return new Promise((resolve, reject) => {
      if (fs.existsSync(dirPath)) {
        let propertiesDir = {};
        let foldersCount = -1;
        let filesCount = 0;
        let totalSize = 0;

        const stack = [dirPath];
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
            });
          }
        }

        propertiesDir["lastTimeMod"] = fs
          .statSync(dirPath)
          .mtime.toLocaleString();
        propertiesDir["totalfiles"] = filesCount;
        propertiesDir["totalfolders"] = foldersCount;
        propertiesDir["totalSize"] = totalSize;
        resolve(propertiesDir);
      } else {
        reject({ status: false, message: "La ruta del directorio no existe!" });
      }
    });
  }

  move(pathOrigin, pathDestiny) {
    return new Promise((resolve, reject) => {
      if (fs.existsSync(pathOrigin)) {
        fsx.move(pathOrigin, pathDestiny, { overwrite: true }, (err) => {
          if (err) {
            console.error("Error al mover la carpeta:", err);
            reject({ status: false, message: "Error al mover el directorio" });
          } else {
            console.log("Carpeta movida con éxito");
            resolve({
              status: true,
              message: "Directorio creado correctamente",
            });
          }
        });
      } else {
        reject({ status: false, message: "La ruta del directorio no existe!" });
      }
    });
  }

  copy(pathOrigin, pathDestiny) {
    return new Promise((resolve, reject) => {
      if (fs.existsSync(pathOrigin)) {
        fsx.copy(pathOrigin, pathDestiny, (err) => {
          if (err) {
            console.error("Error al copiar la carpeta:", err);
            reject({ status: false, message: "Error al copiar el directorio" });
          } else {
            console.log("Carpeta copiada con éxito");
            resolve({
              status: true,
              message: "Directorio copiado correctamente",
            });
          }
        });
      } else {
        reject({ status: false, message: "La ruta del directorio no existe!" });
      }
    });
  }

  async __buildTree(currentPath, currentNode) {
    const items = fs.readdirSync(currentPath);
    for (const item of items) {
      const itemPath = `${currentPath}/${item}`;
      const stats = fs.statSync(itemPath);
      if (stats.isDirectory()) {
        currentNode[item] = { type: "directory" };
        await this.__buildTree(itemPath, currentNode[item]);
      } else {
        const fileSize = (stats.size / 1024).toFixed(4);
        const fileTime = new Date(stats.mtime);
        currentNode[item] = {
          size: fileSize,
          date: fileTime.toLocaleString(),
          type: "file",
        };
      }
    }
  }
}

module.exports = { DirectoryHandler };
