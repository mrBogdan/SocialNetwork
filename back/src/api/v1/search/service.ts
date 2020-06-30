import { BaseService } from '../../../core';

export default class SearchService extends BaseService {
  constructor(userModel: any) {
    super(userModel);
  }

  search(query: any) {
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
