"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../../../core");
class SearchService extends core_1.BaseService {
    constructor(userModel) {
        super(userModel);
    }
    search(query) {
        const re = new RegExp(query, 'i');
        return this.model.find({
            $or: [
                {
                    name: {
                        $regex: re,
                    },
                },
                {
                    last_name: {
                        $regex: re,
                    },
                }
            ]
        });
    }
}
exports.default = SearchService;
