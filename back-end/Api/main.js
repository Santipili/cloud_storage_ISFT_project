const { Server } = require("./server/server.js");
const { ProxiApi } = require("./src/ProxiApi/ProxiApi.js");
const { FilesHandler } = require("./src/Handlers/FilesHandler/FilesHandler.js");
const {
  DirectoryHandler,
} = require("./src/Handlers/DirectoryHandler/DirectoryHandler.js");

const { ProxiAccounting } = require("./src/ProxiApi/ProxiAccounting.js");

const app = new Server();
const port = process.env.PORT || 3000;
const directoryHandler = new DirectoryHandler();
const fileHandler = new FilesHandler();

const proxiApi = new ProxiApi("uploads", fileHandler, directoryHandler);
const proxiAccounting = new ProxiAccounting();

app.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello!");
});

// TODO : CHECK AFTER MERGE

app.post("/sessionhandler/login", proxiAccounting.login);
app.post("/sessionhandler/logout", proxiAccounting.logout);

app.post("/filesHandler/upload", proxiApi.uploadFiles);
app.post("/filesHandler/download", proxiApi.downloadFile);

app.post("/directoryHandler/rename", proxiApi.renameDirectory);
app.post("/directoryHandler/create", proxiApi.createDirectory);
app.post("/directoryHandler/delete", proxiApi.deleteDirectory);
app.post("/directoryHandler/listcontent", proxiApi.listDirectory);
app.post("/directoryHandler/listcontenttree", proxiApi.listContentTree);
app.post("/directoryHandler/properties", proxiApi.getDirProperties);
app.post("/directoryHandler/copy", proxiApi.copyDirectory);
app.post("/directoryHandler/move", proxiApi.moveDirectory);

app.start(port);

async function main() {
  try {
    const response = await fileHandler.download(
      "uploads/1/TP U8 Grafos.docx"
    );
    console.log(response);
    const blob = new Blob([response], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob)
    console.log(url);
  } catch (error) {
    console.error("Ocurrió un error al descargar el contenido:", error);
  }
}

main();
