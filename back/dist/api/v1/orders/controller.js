"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../modules/utils");
class OrderController {
    constructor(svc) {
        this.svc = svc;
    }
    create(ctx) {
        const createParams = ctx.request.body;
        return this.svc.create(createParams)
            .then((res) => ctx.body = res)
            .catch(utils_1.errorLog);
    }
    getList(ctx) {
        const query = ctx.query;
        return this.svc.getList(query, [{
                path: 'products',
                model: 'products'
            }, {
                path: 'user',
                model: 'users'
            }])
            .then((res) => ctx.body = res)
            .catch(utils_1.errorLog);
    }
    getById(ctx) {
        const id = ctx.params.id;
        return this.svc.getById(id)
            .then((res) => ctx.body = res)
            .catch(utils_1.errorLog);
    }
    update(ctx) {
        const orderId = ctx.params.id;
        const product_owner = ctx.state.user._id;
        const updateParams = ctx.request.body;
        return this.svc.findOneAndUpdate({
            _id: orderId,
            product_owner
        }, updateParams, { new: true }, {
            path: 'products',
            model: 'products',
        })
            .then((res) => ctx.body = res)
            .catch(utils_1.errorLog);
    }
    remove(ctx) {
        const id = ctx.params.id;
        return this.svc.deleteById(id)
            .then(() => ctx.status = 200)
            .catch(utils_1.errorLog);
    }
}
exports.default = OrderController;
