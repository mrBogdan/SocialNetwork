"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const middleware_1 = require("../../../modules/middleware");
exports.default = (ctrl) => {
    const router = new Router({
        prefix: '/dialogs',
    });
    router.post('/', middleware_1.passportMiddleware, (ctx) => ctrl.create(ctx));
    router.get('/', middleware_1.passportMiddleware, (ctx) => ctrl.list(ctx));
    router.get('/:id', middleware_1.passportMiddleware, (ctx) => ctrl.getById(ctx));
    return router.routes();
};
