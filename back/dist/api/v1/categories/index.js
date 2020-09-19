"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("./router");
const service_1 = require("./service");
const controller_1 = require("./controller");
exports.default = (models) => router_1.default(new controller_1.default(new service_1.default(models.Category)));
