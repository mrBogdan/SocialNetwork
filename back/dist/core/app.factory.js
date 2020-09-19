"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("./app_protocols/http");
const https_1 = require("./app_protocols/https");
const { PROTOCOLS } = require('../../consts');
class AppFactory {
    constructor(config, app, SocketServerClass) {
        this.config = config;
        this.app = app;
        this.SocketServerClass = SocketServerClass;
    }
    createApp(protocol) {
        switch (protocol) {
            case PROTOCOLS.HTTP: {
                return http_1.default(this.config, this.app, this.SocketServerClass);
            }
            case PROTOCOLS.HTTPS: {
                return https_1.default(this.config, this.app, this.SocketServerClass);
            }
            default: {
                return http_1.default(this.config, this.app, this.SocketServerClass);
            }
        }
    }
}
exports.default = AppFactory;
