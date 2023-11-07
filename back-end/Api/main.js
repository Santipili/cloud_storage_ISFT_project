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

app.start(port);

/* async function main() {
  try {
    const response = await directoryHandler.listContent(
      "../../../../../../REDES-Y-COMUNICACIONES"
    );
    console.log(response);
  } catch (error) {
    console.error("Ocurrió un error al listar el contenido:", error);
  }
}

main(); */
