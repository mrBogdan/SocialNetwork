"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const morgan = require("koa-morgan");
exports.default = morgan(':method :url :status :res[content-length] - :response-time ms');
