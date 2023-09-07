const fs = require("fs");

class fileController{
    constructor(dirReference)    {
        const uploadDir = dirReference;

        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
          }
    }

    uploadFile(currentPath,uploadedPath){
        
        fs.readFile(currentPath, (readErr, data) => {
            if (readErr) {
            console.error(readErr);
            console.log("no se pude abrir archivo");

            } else {
            fs.writeFile(uploadedPath, data, (writeErr) => {
                if (writeErr) {
                    console.log("error al escribir archvo")
                console.error(writeErr);
                }
            });
            }
        });
    }
}

module.exports = {fileController};