"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("./router");
const controller_1 = require("./controller");
const service_1 = require("./service");
exports.default = (models, config) => router_1.default(new controller_1.default(new service_1.default(models.User), config));
