import { BaseService } from '../../../core';

export default class UserService extends BaseService {
  constructor(userModel: any) {
    super(userModel);
  }

  findOne(condition: any) {
    return this.model.findOne(condition);
  }
}
