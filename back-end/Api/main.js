const { Server } = require("./server/server.js");
const {uploadFileHandler} = require("./server/fileHandler.js")

const app = new Server();

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello!");
});

app.post("/upload", uploadFileHandler);
app.start(port);
