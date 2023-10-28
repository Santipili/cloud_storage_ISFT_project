const { Server } = require("./server/server.js");
const { ProxiApi } = require("./src/ProxiApi/ProxiApi.js");
const { FilesHandler } = require("./src/Handlers/FilesHandler/FilesHandler.js");
const { DirectoryHandler } = require("./src/Handlers/DirectoryHandler/DirectoryHandler.js");

const app = new Server();
const port = process.env.PORT || 3000;

const fileHandler = new FilesHandler();
const directoryHandler = new DirectoryHandler();


const requestHandler = new ProxiApi("/uploads",fileHandler,directoryHandler);

app.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello!");
});

//Create FileHandler object
//Create FileHandlerProxy( fileHandlerObject );
app.post("/filesHandler/upload", requestHandler.uploadFiles);

app.post("/directoryHandler/create", requestHandler.createDirectory);
app.post("/directoryHandler/delete", requestHandler.deleteDirectory);
app.post("/directoryHandler/rename", requestHandler.renameDirectory);
app.post("/directoryHandler/list", requestHandler.listDirectory);
app.post("/directoryHandler/properties", requestHandler.getDirProperties);




app.start(port);




