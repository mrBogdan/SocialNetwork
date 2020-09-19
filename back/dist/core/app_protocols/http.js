"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const socket_1 = require("../../socket");
const models_1 = require("../../models");
exports.default = (config, app, SocketServer) => {
    const httpServer = http.createServer(app.callback());
    const ioHttp = new SocketServer(httpServer);
    socket_1.default(config, models_1.default, ioHttp);
    httpServer.listen(config.port, () => console.log(`Started on: ${config.port}`));
};
