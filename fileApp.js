const http = require("http");
const fs = require("fs");
const path = require("path");
const multiparty = require("multiparty");

const server = http.createServer((req, res) => {
  if (req.method === "GET") {
    if (req.url === "/") {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>File Uploader</title>
        </head>
        <body>
          <h1>File Upload</h1>
          <form action="/upload" method="POST" enctype="multipart/form-data">
            <input type="file" name="file">
            <button type="submit">Upload</button>
          </form>
        </body>
        </html>
      `);
    }
  } else if (req.method === "POST") {
    const uploadDir = "./uploads";

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    if (req.url === "/upload") {
      const form = new multiparty.Form();

      form.parse(req, (err, fields, files) => {
        if (err) {
          console.error(err);
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end("Internal Server Error");
          return;
        }

        // Obtener la información del archivo
        const file = files.file[0];
        const fileName = file.originalFilename;
        const filePath = path.join(__dirname, uploadDir, fileName);

        fs.readFile(file.path, (readErr, data) => {
          if (readErr) {
            console.error(readErr);
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end("Internal Server Error");
          } else {
            fs.writeFile(filePath, data, (writeErr) => {
              if (writeErr) {
                console.error(writeErr);
                res.writeHead(500, { "Content-Type": "text/plain" });
                res.end("Internal Server Error");
              } else {
                res.writeHead(200, { "Content-Type": "text/plain" });
                res.end("File uploaded successfully.");
              }
            });
          }
        });
      });
    }
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
