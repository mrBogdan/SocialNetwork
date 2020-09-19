"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const koaStatic = require("koa-static");
const ROOT = '.';
exports.default = koaStatic(ROOT, {
    hidden: true,
});
