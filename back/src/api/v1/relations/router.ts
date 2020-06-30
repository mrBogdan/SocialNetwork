import RelationController from './controller';
import * as Router from 'koa-router';
import { passportMiddleware } from '../../../modules';

export default (relationController: RelationController) => {
  const router = new Router({
    prefix: '/relations',
  });

  router.post('/', passportMiddleware, (ctx: any) => relationController.sendFriendRequest(ctx));
  router.post('/add-friend', passportMiddleware, (ctx: any) => relationController.addToFriends(ctx));
  router.post('/cancel-friend-request', passportMiddleware, (ctx: any) => relationController.cancelFriendRequest(ctx));
  router.post('/check-user-relations', passportMiddleware, (ctx: any) => relationController.checkUsersRelation(ctx));
  router.delete('/:_id', passportMiddleware, (ctx: any) => relationController.deleteOne(ctx));
  router.get('/', (ctx: any) => relationController.getList(ctx));
  router.get(
    '/get-new-friend-requests',
    passportMiddleware,
    (ctx: any) => relationController.getNewRelationRequest(ctx),
  );
  router.get(
    '/get-new-friend-requests-count',
    passportMiddleware,
    (ctx: any) => relationController.getNewRelationRequestCount(ctx),
  );

  return router.routes();
}
