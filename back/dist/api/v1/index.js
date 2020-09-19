"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const auth_1 = require("./auth");
const posts_1 = require("./posts");
const likes_1 = require("./likes");
const comments_1 = require("./comments");
const relations_1 = require("./relations");
const user_1 = require("./user");
const dialogs_1 = require("./dialogs");
const search_1 = require("./search");
const products_1 = require("./products");
const categories_1 = require("./categories");
const orders_1 = require("./orders");
exports.default = (models, config) => {
    const router = new Router({
        prefix: '/api/v1',
    });
    router.use(auth_1.default(models, config), posts_1.default(models), likes_1.default(models), comments_1.default(models), relations_1.default(models), user_1.default(models), dialogs_1.default(models), search_1.default(models), products_1.default(models), categories_1.default(models), orders_1.default(models));
    return router;
};
