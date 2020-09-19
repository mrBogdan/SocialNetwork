"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../modules/utils");
class ProductsController {
    constructor(svc) {
        this.svc = svc;
    }
    create(ctx) {
        const { name, category, description, price, } = ctx.request.body;
        const product_owner = ctx.state.user._id;
        const photo = ctx.request.file.path;
        return this.svc.create({
            name,
            category,
            description,
            price,
            product_owner,
            photo
        })
            .then(() => ctx.status = 201)
            .catch(utils_1.errorLog);
    }
    getById(ctx) {
        return this.svc.getById(ctx.params.id, {
            path: 'category',
            model: 'categories'
        })
            .then((item) => utils_1.default.VALIDATE(ctx, item))
            .then((item) => ctx.body = item)
            .catch(utils_1.errorLog);
    }
    getList(ctx) {
        const query = ctx.query;
        return this.svc.getList(query, {
            path: 'category',
            model: 'categories'
        })
            .then((res) => ctx.body = res)
            .catch(utils_1.errorLog);
    }
    remove(ctx) {
        const id = ctx.params.id;
        return this.svc
            .deleteById(id)
            .then(() => ctx.status = 200)
            .catch(utils_1.errorLog);
    }
    update(ctx) {
        const productId = ctx.params.id;
        const { name, category, description, price, } = ctx.request.body;
        const product_owner = ctx.state.user._id;
        const photo = ctx.request.file ? ctx.request.file.path : null;
        const updateParams = photo ? {
            name,
            category,
            description,
            price,
            photo,
        } : {
            name,
            category,
            description,
            price,
        };
        return this.svc
            .findOneAndUpdate({
            product_owner,
            _id: productId,
        }, updateParams)
            .then(() => ctx.status = 200)
            .catch(utils_1.errorLog);
    }
}
exports.default = ProductsController;
