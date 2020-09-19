"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const v1_1 = require("../api/v1");
const models_1 = require("../models");
const handlers_1 = require("../modules/handlers");
const db_1 = require("../modules/db");
const app_factory_1 = require("./app.factory");
const SocketServer = require('socket.io');
exports.default = (config) => {
    const app = new Koa();
    const router = v1_1.default(models_1.default, config);
    handlers_1.default.forEach((h) => app.use(h));
    db_1.connect();
    app.use(router.routes());
    app.use(router.allowedMethods());
    const appFactory = new app_factory_1.default(config, app, SocketServer);
    return appFactory.createApp(config.PROTOCOL);
};
