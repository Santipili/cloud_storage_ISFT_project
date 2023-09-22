const { Server } = require("./server/server.js");

const { RequestsHandler } = require("./src/handlerRequests/RequestsHandler.js");

const app = new Server();

const port = process.env.PORT || 3000;
const requestHandler = new RequestsHandler();

app.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello!");
});

app.post("/upload", requestHandler.uploadFiles);
app.start(port);

requestHandler.deleteFile("certificadoInglesProgresar.pdf");

/* requestHandler.uploadFileName(
  "./uploads/certificadoInglesProgresar.pdf",
  "nuevoNombre.pdf"
); */
