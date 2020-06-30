import ConversationController from './controller';
import * as Router from 'koa-router';
import { passportMiddleware } from '../../../modules/middleware';

export default (ctrl: ConversationController) => {
  const router = new Router({
    prefix: '/dialogs',
  });

  router.post('/', passportMiddleware, (ctx: any) => ctrl.create(ctx));
  router.get('/', passportMiddleware, (ctx: any) => ctrl.list(ctx));
  router.get('/:id', passportMiddleware, (ctx: any) => ctrl.getById(ctx));

  return router.routes();
}
