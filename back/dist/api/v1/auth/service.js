"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../../../core");
class UserService extends core_1.BaseService {
    constructor(userModel) {
        super(userModel);
    }
    findOne(condition) {
        return this.model.findOne(condition);
    }
}
exports.default = UserService;
