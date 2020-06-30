export default class BaseService {
  constructor(protected model: any) {
  }

  create(data: any) {
    return new this.model(data).save();
  }

  getById(id: string, populate?: any) {
    return this.model.findById(id)
      .populate(populate);
  }

  deleteById(_id: string) {
    return this.model.deleteOne({ _id });
  }

  findOneAndDelete(condition: any) {
    return this.model.findOneAndDelete(condition);
  }

  findOneAndUpdate(condition: any, update: any, options?: any, populate?: any) {
    return this.model.findOneAndUpdate(condition, update, options)
      .populate(populate);
  }

  findOne(condition: any) {
    return this.model.findOne(condition);
  }

  async getList(query?: any, populate?: any) {
    const { skip, limit } = getListParams(query);
    delete query.skip;
    delete query.limit;

    const q = 'users' in query ? { user: { $in: query.users.split(',') } } : query;
    const list = await this.model
      .find(q)
      .populate(populate)
      .sort({ created_date: - 1 })
      .skip(+skip)
      .limit(+limit);

    return {
      list,
      count: await this.model.count(q),
    };
  }
}

function getListParams(query: any) {
  const skip = query.skip || 0;
  const limit = query.limit || 100;
  return {
    skip,
    limit,
  }
}
