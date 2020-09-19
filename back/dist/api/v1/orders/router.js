"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const modules_1 = require("../../../modules");
exports.default = (ctrl) => {
    const router = new Router({
        prefix: '/orders',
    });
    router.post('/', modules_1.passportMiddleware, (ctx) => ctrl.create(ctx));
    router.get('/', modules_1.passportMiddleware, (ctx) => ctrl.getList(ctx));
    router.delete('/:id', modules_1.passportMiddleware, (ctx) => ctrl.remove(ctx));
    router.put('/:id', modules_1.passportMiddleware, (ctx) => ctrl.update(ctx));
    router.get('/:id', modules_1.passportMiddleware, (ctx) => ctrl.getById(ctx));
    return router.routes();
};
