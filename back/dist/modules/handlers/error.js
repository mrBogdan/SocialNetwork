"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
exports.default = async (ctx, next) => {
    try {
        await next();
    }
    catch (e) {
        utils_1.errorLog(e);
        ctx.status = e.status || 500;
        ctx.body = {
            error: e.message || 'Internal server error',
        };
    }
};
