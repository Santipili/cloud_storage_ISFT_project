const { Server } = require("./server/server.js");
const { RequestsHandler } = require("./src/handlerRequests/RequestsHandler.js");
const { FilesHandler } = require("./src/controllers/FilesHandler.js");
const { DirectoryHandler } = require("./src/controllers/DirectoryHandler.js");

const app = new Server();
const port = process.env.PORT || 3000;

const fileHandler = new FilesHandler();

const directoryHandler = new DirectoryHandler();

const requestHandler = new RequestsHandler(
  "uploads",
  fileHandler,
  directoryHandler
);

app.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello!");
});

app.post("/upload", requestHandler.uploadFiles);

app.post("/upload/rename", requestHandler.renameDirectory);
app.post("/directoryHandler/create", requestHandler.createDirectory);
app.post("/directoryHandler/delete", requestHandler.deleteDirectory);
app.post("/directoryHandler/list", requestHandler.listDirectory);

app.start(port);
