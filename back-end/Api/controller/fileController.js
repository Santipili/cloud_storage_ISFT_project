const fs = require("fs");
const path = require('path');

class fileController{
    constructor(dirReference)    {
        const uploadDir = dirReference;

        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
          }
    }

    uploadFile(currentPath,uploadedPath){
        
        if(fs.existsSync(currentPath)){

            fs.readFile(currentPath, (readErr, data) => {
                if (readErr) {
                console.error(readErr);
                console.log("no se pude abrir archivo");
    
                } else {
                    const uploadedDir = path.dirname(uploadedPath);
                    if (!fs.existsSync(uploadedDir)) {
                        fs.mkdirSync(uploadedDir, { recursive: true });
                      }

                fs.writeFile(uploadedPath, data, (writeErr) => {
                    if (writeErr) {
                        console.log("error al escribir archvo")
                    console.error(writeErr);
                    }
                });
                }
            });
        }else {
            console.log("El archivo en currentPath no existe");
        }
    }
}

module.exports = {fileController};