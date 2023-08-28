const http = require("http");
const fs = require("fs");
const path = require("path");

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
    if (req.url === "/upload") {
      const chunks = [];
      req.on("data", (chunk) => {
        chunks.push(chunk);
      });

      req.on("end", () => {
        const data = Buffer.concat(chunks);
        const fileName = Date.now() + path.extname(req.headers["x-file-name"]);
        const filePath = path.join(__dirname, "uploads", fileName);

        fs.writeFile(filePath, data, (err) => {
          if (err) {
            console.error(err);
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end("Internal Server Error");
          } else {
            res.writeHead(200, { "Content-Type": "text/plain" });
            res.end("File uploaded successfully.");
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
