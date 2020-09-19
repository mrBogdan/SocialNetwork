"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseService {
    constructor(model) {
        this.model = model;
    }
    create(data) {
        return new this.model(data).save();
    }
    getById(id, populate) {
        return this.model.findById(id)
            .populate(populate);
    }
    deleteById(_id) {
        return this.model.deleteOne({ _id });
    }
    findOneAndDelete(condition) {
        return this.model.findOneAndDelete(condition);
    }
    findOneAndUpdate(condition, update, options, populate) {
        return this.model.findOneAndUpdate(condition, update, options)
            .populate(populate);
    }
    findOne(condition) {
        return this.model.findOne(condition);
    }
    async getList(query, populate) {
        const { skip, limit } = getListParams(query);
        delete query.skip;
        delete query.limit;
        const q = 'users' in query ? { user: { $in: query.users.split(',') } } : query;
        const list = await this.model
            .find(q)
            .populate(populate)
            .sort({ created_date: -1 })
            .skip(+skip)
            .limit(+limit);
        return {
            list,
            count: await this.model.count(q),
        };
    }
}
exports.default = BaseService;
function getListParams(query) {
    const skip = query.skip || 0;
    const limit = query.limit || 100;
    return {
        skip,
        limit,
    };
}
