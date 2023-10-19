const { Server } = require("./server/server.js");
const {
  FilesHandlerProxy,
} = require("./src/Proxis/filesHandlerProxy/filesHandlerProxy.js");
const { FilesHandler } = require("./src/Handlers/FilesHandler/FilesHandler.js");
const {
  DirectoryHandlerProxy,
} = require("./src/Proxis/directoryHandlerProxy/directoryHandlerProxy.js");

const app = new Server();
const port = process.env.PORT || 3000;

const fileHandler = new FilesHandler();

const filesHandlerProxy = new FilesHandlerProxy(fileHandler);
const directoryHandlerProxy = new DirectoryHandlerProxy();

app.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello!");
});

//Create FileHandler object

app.post("/filesHandler/upload", filesHandlerProxy.upload);
app.post("/directoryHandler/create", directoryHandlerProxy.create);
app.post("/directoryHandler/delete", directoryHandlerProxy.delete);

app.start(port);

/* TESTs */

//fileHandler.rename("Redes_de_computadoras_Un_enfoque_descend.pdf", "Redes.pdf");
//fileHandler.getProperties("Redes.pdf");
//fileHandler.move("Redes.pdf", "redes/Redes.pdf");
//fileHandler.copy("Redes.pdf", "redes/Redes.pdf");

/*  END OF TESTs  */
