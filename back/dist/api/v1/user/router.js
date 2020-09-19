"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const middleware_1 = require("../../../modules/middleware");
exports.default = (ctrl) => {
    const router = new Router({
        prefix: '/users',
    });
    router.get('/', middleware_1.passportMiddleware, (ctx) => ctrl.getList(ctx));
    router.get('/:id', middleware_1.passportMiddleware, (ctx) => ctrl.getById(ctx));
    router.put('/:id', middleware_1.passportMiddleware, middleware_1.uploadSingle, (ctx) => ctrl.update(ctx));
    return router.routes();
};
