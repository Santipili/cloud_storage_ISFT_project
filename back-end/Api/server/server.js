const http = require("http");
const url = require("url");

class Server {
  constructor() {
    this.routes = {
      GET: {},
      POST: {},
    };
  }

  get(path, handler) {
    this.routes.GET[path] = handler;
  }

  post(path, handler) {
    this.routes.POST[path] = handler;
  }

  handleRequest(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    const { pathname } = url.parse(req.url, true);
    const method = req.method;
    console.log("METHOD");
    console.log(method);
    if (method.toLowerCase() == "options") {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type");
      res.statusCode = 200;
      res.end();
      return;
    }

    const handler = this.routes[method][pathname] || this.routes[method]["*"];

    if (handler) {
      handler(req, res);
    } else {
      res.statusCode = 404;
      res.end("Not Found");
    }
  }

  start(port) {
    const server = http.createServer((req, res) => {
      this.handleRequest(req, res);
    });

    server.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  }
}

module.exports = { Server };
