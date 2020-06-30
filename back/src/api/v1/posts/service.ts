import { BaseService } from '../../../core';

export default class PostsService extends BaseService {
  constructor(postsModel: any) {
    super(postsModel);
  }

  async updateById(_id: string, user: string, body: any) {
    return this.model.findOneAndUpdate(
      { _id, user },
      { $set: { body } },
      { new: true }
    )
  }
}
