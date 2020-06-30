import * as Router from 'koa-router';
import UserController from './controller';
import { uploadSingle, passportMiddleware } from '../../../modules/middleware';

export default (ctrl: UserController) => {
  const router = new Router({
    prefix: '/users',
  });

  router.get('/', passportMiddleware, (ctx: any) => ctrl.getList(ctx));
  router.get('/:id', passportMiddleware, (ctx: any) => ctrl.getById(ctx));
  router.put('/:id', passportMiddleware, uploadSingle, (ctx: any) => ctrl.update(ctx));

  return router.routes();
}
