const { Server } = require("./server/server.js");
const { ProxiApi } = require("./src/ProxiApi/ProxiApi.js");
const { FilesHandler } = require("./src/Handlers/FilesHandler/FilesHandler.js");
const {
  DirectoryHandler,
} = require("./src/Handlers/DirectoryHandler/DirectoryHandler.js");

const app = new Server();
const port = process.env.PORT || 3000;

const fileHandler = new FilesHandler();
const directoryHandler = new DirectoryHandler();

const requestHandler = new ProxiApi("/uploads", fileHandler, directoryHandler);

app.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello!");
});

app.post("filehandler/upload", requestHandler.uploadFiles);

app.post("/upload/rename", requestHandler.renameDirectory); //raro el nombre de la ruta
app.post("/directoryHandler/create", requestHandler.createDirectory);
app.post("/directoryHandler/delete", requestHandler.deleteDirectory);
app.post("/directoryHandler/list", requestHandler.listDirectory);

app.start(port);

app.start(port);

/* tests */

//fileHandler.rename("Redes_de_computadoras_Un_enfoque_descend.pdf", "Redes.pdf");
//fileHandler.getProperties("Redes.pdf");
//fileHandler.move("Redes.pdf", "redes/Redes.pdf");
//fileHandler.copy("Redes.pdf", "redes/Redes.pdf");

/*end of  tests */
