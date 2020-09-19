"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MongooseError = require('mongoose').Error;
exports.default = async (ctx, next) => {
    try {
        await next();
    }
    catch (e) {
        if (e instanceof MongooseError) {
            ctx.throw(400, 'Bad request');
        }
        else {
            ctx.throw(e);
        }
    }
};
