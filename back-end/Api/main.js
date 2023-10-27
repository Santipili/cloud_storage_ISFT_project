const { Server } = require("./server/server.js");
const { ProxiApi } = require("./src/ProxiApi/ProxiApi.js");
const { FilesHandler } = require("./src/Handlers/FilesHandler/FilesHandler.js");
const { DirectoryHandler } = require("./src/Handlers/DirectoryHandler/DirectoryHandler.js");

const app = new Server();
const port = process.env.PORT || 3000;
const directoryHandler = new DirectoryHandler();
const fileHandler = new FilesHandler();

const requestHandler = new ProxiApi("uploads", fileHandler, directoryHandler);

app.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello!");
});

// TODO : CHECK AFTER MERGE
app.post("/filesHandler/upload", requestHandler.uploadFiles);

app.post("/directoryHandler/rename", requestHandler.renameDirectory); //raro el nombre de la ruta
app.post("/directoryHandler/create", requestHandler.createDirectory);
app.post("/directoryHandler/delete", requestHandler.deleteDirectory);
app.post("/directoryHandler/list", requestHandler.listDirectory);

app.start(port);
