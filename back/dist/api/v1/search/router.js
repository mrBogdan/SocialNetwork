"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const middleware_1 = require("../../../modules/middleware");
function default_1(ctrl) {
    const router = new Router({
        prefix: '/search',
    });
    router.get('/', middleware_1.passportMiddleware, (ctx) => ctrl.search(ctx));
    return router.routes();
}
exports.default = default_1;
