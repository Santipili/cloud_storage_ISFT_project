const { Server } = require("./server/server.js");
const { ProxiApi } = require("./src/ProxiApi/ProxiApi.js");
const { FilesHandler } = require("./src/Handlers/FilesHandler/FilesHandler.js");
const {
  DirectoryHandler,
} = require("./src/Handlers/DirectoryHandler/DirectoryHandler.js");

const app = new Server();
const port = process.env.PORT || 3000;
const directoryHandler = new DirectoryHandler();
const fileHandler = new FilesHandler();

const proxiApi = new ProxiApi("uploads", fileHandler, directoryHandler);

app.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello!");
});

// TODO : CHECK AFTER MERGE
app.post("/filesHandler/upload", proxiApi.uploadFiles);

app.post("/directoryHandler/rename", proxiApi.renameDirectory);
app.post("/directoryHandler/create", proxiApi.createDirectory);
app.post("/directoryHandler/delete", proxiApi.deleteDirectory);
app.post("/directoryHandler/list", proxiApi.listDirectory);
app.post("/directoryHandler/properties", proxiApi.getDirProperties);
app.post("/directoryHandler/copy", proxiApi.copyDirectory);
app.post("/directoryHandler/move", proxiApi.moveDirectory);

app.start(port);
