const { Server } = require("./server/server.js");
const { RequestsHandler } = require("./src/handlerRequests/RequestsHandler.js");

const app = new Server();
const port = process.env.PORT || 3000;
const requestHandler = new RequestsHandler("/uploads");

app.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello!");
});

app.post("/upload", requestHandler.uploadFiles);
app.post("/upload/newfolder", requestHandler.createDirectory)
app.start(port);

//TESTs

/* requestHandler.deleteFile("certificadoInglesProgresar.pdf"); */

/* requestHandler.uploadFileName(
  "./uploads/certificadoInglesProgresar.pdf",
  "nuevoNombre.pdf"
); */

// END OF TESTs
