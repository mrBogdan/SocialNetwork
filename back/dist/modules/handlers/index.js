"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = require("./passport");
const error_1 = require("./error");
const bodyParser_1 = require("./bodyParser");
const morgan_1 = require("./morgan");
const cors_1 = require("./cors");
const koaStatic_1 = require("./koaStatic");
const catchMongooseError_1 = require("./catchMongooseError");
exports.default = [
    passport_1.default,
    error_1.default,
    catchMongooseError_1.default,
    bodyParser_1.default,
    koaStatic_1.default,
    morgan_1.default,
    cors_1.default,
];
