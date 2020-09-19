"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
exports.default = (authController) => {
    const router = new Router({
        prefix: '/auth',
    });
    router.post('/register', authController.register.bind(authController));
    router.post('/login', authController.login.bind(authController));
    return router.routes();
};
