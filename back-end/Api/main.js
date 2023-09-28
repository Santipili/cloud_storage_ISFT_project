const { Server } = require("./server/server.js");
const { RequestsHandler } = require("./src/handlerRequests/RequestsHandler.js");
const { FilesHandler } = require("./src/controllers/FilesHandler.js");

const app = new Server();
const port = process.env.PORT || 3000;

const fileHandler = new FilesHandler();

const requestHandler = new RequestsHandler(fileHandler,"/uploads");


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

 requestHandler.deleteFile("certificadoInglesProgresar.pdf"); 

 requestHandler.uploadFileName(
  "./uploads/certificadoInglesProgresar.pdf",
  "nuevoNombre.pdf"
); 


app.post("/upload/deletefolder", requestHandler.deleteDirectory);


 END OF TESTs */
