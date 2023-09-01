const { Server } = require("./server/server.js");

const path = require("path");
const multiparty = require("multiparty");
const fs = require("fs");

const app = new Server();

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello!");
});

app.post("/upload", (req, res) => {
  const uploadDir = "./uploads";

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

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
});

app.start(port);
