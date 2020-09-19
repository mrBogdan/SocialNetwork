"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadSingle = exports.passportMiddleware = void 0;
const passport_1 = require("./passport");
exports.passportMiddleware = passport_1.default;
const multer_1 = require("./multer");
Object.defineProperty(exports, "uploadSingle", { enumerable: true, get: function () { return multer_1.uploadSingle; } });
