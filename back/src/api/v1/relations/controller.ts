import RelationService from './service';
import { errorLog } from '../../../modules/utils';

export default class RelationController {
  constructor(private relationService: RelationService) {
  }

  async addToFriends(ctx: any) {
    const { subscriber } = ctx.request.body;
    const source = ctx.state.user._id;

    await this.relationService.create({
      source: subscriber,
      subscriber: source,
    });
    ctx.status = 201;
  }

  async cancelFriendRequest(ctx: any) {
    const { subscriber } = ctx.request.body;
    const source = ctx.state.user._id;

    await this.relationService.findOneAndDelete({
      subscriber, source,
    });
    ctx.status = 200;
  }

  async sendFriendRequest(ctx: any) {
    const { source } = ctx.request.body;
    const subscriber = ctx.state.user._id;

    const checkRelation = await this.relationService.checkRelations(source, subscriber);
    if (checkRelation) {
      ctx.throw(400, 'You have added to friends the user');
    }
    await this.relationService.create({
      source,
      subscriber,
    });
    ctx.status = 201;
  }

  async getList(ctx: any) {
    ctx.body = await this.relationService.getList(ctx.query);
  }

  async deleteOne(ctx: any) {
    const { _id } = ctx.params;
    const subscriber = ctx.state.user._id;
    await this.relationService.findOneAndDelete({ _id, subscriber });
    ctx.body = {
      message: 'Relation is destroyed',
    };
  }

  checkUsersRelation(ctx: any) {
    const { source } = ctx.request.body;
    const subscriber = ctx.state.user._id;

    return this.relationService.checkUserRelations(source, subscriber)
      .then((res) => ctx.body = res)
      .catch(errorLog);
  }

  getNewRelationRequest(ctx: any) {
    const userId = ctx.state.user._id;
    return this.relationService.getNewRelationRequest(userId)
      .then((res) => ctx.body = res)
      .catch(errorLog);
  }

  getNewRelationRequestCount(ctx: any) {
    const userId = ctx.state.user._id;
    return this.relationService.getNewRelationRequestCount(userId)
      .then((count: number) => ctx.body = { count })
      .catch(errorLog);
  }
}
