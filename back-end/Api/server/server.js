const http = require("http");
const url = require("url");

class Server {
  constructor() {
    this.routes = {
      GET: {},
      POST: {},
    };

    this.headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
      "Access-Control-Allow-Headers": 
       "content-type, session-token, user-id",
      "Content-Type": "application/json",
    };
  }

  get(path, handler) {
    this.routes.GET[path] = handler;
  }

  post(path, handler) {
    this.routes.POST[path] = handler;
  }

  async handleRequest(req, res) {
    res.writeHead(200, this.headers);
    const { pathname } = url.parse(req.url, true);
    const method = req.method;

    if (method === "OPTIONS") {
      res.writeHead(204, this.headers);
      res.end();
      return;
    }

    const handler = this.routes[method][pathname] || this.routes[method]["*"];
    console.log(this.routes);
    if (handler) {
      await handler(req, res);
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
