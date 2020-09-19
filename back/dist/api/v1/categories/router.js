"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const middleware_1 = require("../../../modules/middleware");
exports.default = (ctrl) => {
    const router = new Router({
        prefix: '/categories',
    });
    router.get('/', middleware_1.passportMiddleware, (ctx) => ctrl.getList(ctx));
    return router.routes();
};
