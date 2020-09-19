"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../modules/utils");
class CategoriesController {
    constructor(svc) {
        this.svc = svc;
    }
    getList(ctx) {
        return this.svc.getList(ctx.query)
            .then((res) => ctx.body = res)
            .catch(utils_1.errorLog);
    }
}
exports.default = CategoriesController;
