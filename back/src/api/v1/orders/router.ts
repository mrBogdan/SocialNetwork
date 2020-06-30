import OrderController from './controller';
import * as Router from 'koa-router';
import { passportMiddleware } from '../../../modules';

export default (ctrl: OrderController) => {
  const router = new Router({
    prefix: '/orders',
  });

  router.post('/', passportMiddleware, (ctx: any) => ctrl.create(ctx));
  router.get('/', passportMiddleware, (ctx: any) => ctrl.getList(ctx));
  router.delete('/:id', passportMiddleware, (ctx: any) => ctrl.remove(ctx));
  router.put('/:id', passportMiddleware, (ctx: any) => ctrl.update(ctx));
  router.get('/:id', passportMiddleware, (ctx: any) => ctrl.getById(ctx))

  return router.routes();
}
