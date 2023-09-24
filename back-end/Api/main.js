const { Server } = require("./server/server.js");

const { RequestsHandler } = require("./src/handlerRequests/RequestsHandler.js");
const { FilesHandler } = require("./src/controllers/FilesHandler.js");

const app = new Server();

const port = process.env.PORT || 3000;
const fileHandler = new FilesHandler();

const requestHandler = new RequestsHandler(fileHandler);

app.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello!");
});

app.post("/upload", requestHandler.uploadFiles);
app.start(port);

//TESTs

/* requestHandler.deleteFile("certificadoInglesProgresar.pdf"); */

/* requestHandler.uploadFileName(
  "./uploads/certificadoInglesProgresar.pdf",
  "nuevoNombre.pdf"
); */

// END OF TESTs
