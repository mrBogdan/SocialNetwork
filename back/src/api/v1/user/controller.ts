import UserService from './service';
import utils, { errorLog } from '../../../modules/utils';

const bc = require('bcrypt');

type User = any;

export default class UserController {
  constructor(private userService: UserService) {
  }

  async getList(ctx: any) {
      ctx.body = await this.userService.getList(ctx.query);
  }

  getById(ctx: any) {
    return this.userService.getById(ctx.params.id)
      .then((user: User) => utils.VALIDATE(ctx, user))
      .then((user: User) => ctx.body = user)
      .catch(errorLog);
  }

  async update(ctx: any) {
    const _id = ctx.state.user._id;
    const updateParams = ctx.request.body;

    if (ctx.request.file) {
      updateParams.avatar = ctx.request.file.path;
    }

    if (updateParams.password) {
      const salt = await bc.genSalt(10);
      updateParams.password = await bc.hash(updateParams.password, salt);
    }

    return this.userService.findOneAndUpdate({ _id },updateParams, { new: true })
      .then((res: any) => ctx.body = res)
      .catch(errorLog);
  }
}
