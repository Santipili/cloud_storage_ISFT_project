const { Server } = require("./server/server.js");
const { RequestsHandler } = require("./src/handlerRequests/RequestsHandler.js");
const { FilesHandler } = require("./src/FilesHandler/FilesHandler.js");

const app = new Server();
const port = process.env.PORT || 3000;

const fileHandler = new FilesHandler();

const requestHandler = new RequestsHandler(fileHandler);

app.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello!");
});

//Create FileHandler object
//Create FileHandlerProxy( fileHandlerObject );
app.post("/upload", requestHandler.uploadFiles);
app.post("/upload/newfolder", requestHandler.createDirectory);

app.start(port);

/* TESTs






app.post("/upload/deletefolder", requestHandler.deleteDirectory);


 END OF TESTs */
