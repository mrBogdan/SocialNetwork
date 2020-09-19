"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const https = require("https");
const socket_1 = require("../../socket");
const models_1 = require("../../models");
exports.default = (config, app, SocketServer) => {
    const SSL_PATH = '../ssl-keys';
    const sslOptions = {
        key: fs.readFileSync(path.resolve(SSL_PATH + '/private.key')),
        cert: fs.readFileSync(path.resolve(SSL_PATH + '/certificate.crt')),
        ca: fs.readFileSync(path.resolve(SSL_PATH + '/ca_bundle.crt')),
    };
    const httpsServer = https.createServer(sslOptions, app.callback());
    const ioHttps = new SocketServer(httpsServer);
    socket_1.default(config, models_1.default, ioHttps);
    httpsServer.listen(config.sslPort, () => console.log(`Started on: ${config.sslPort}`));
};
