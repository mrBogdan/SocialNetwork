import * as Router from 'koa-router';
import ProductsController from './controller';
import { passportMiddleware, uploadSingle } from '../../../modules';

export default (ctrl: ProductsController) => {
  const router = new Router({
    prefix: '/products'
  });

  router.post('/', passportMiddleware, uploadSingle, (ctx: any) => ctrl.create(ctx));
  router.get('/', passportMiddleware, (ctx: any) => ctrl.getList(ctx));
  router.put('/:id', passportMiddleware, uploadSingle, (ctx: any) => ctrl.update(ctx))
  router.get('/:id', passportMiddleware, (ctx: any) => ctrl.getById(ctx));
  router.delete('/:id', passportMiddleware, (ctx: any) => ctrl.remove(ctx));

  return router.routes();
}
