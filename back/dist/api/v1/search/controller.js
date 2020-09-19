"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SearchController {
    constructor(service) {
        this.service = service;
    }
    async search(ctx) {
        const { q } = ctx.request.query;
        if (!q) {
            ctx.body = {
                count: 0,
                list: [],
            };
        }
        const res = await this.service.search(q);
        ctx.body = {
            count: res.length,
            list: res,
        };
    }
}
exports.default = SearchController;
