import CategoriesController from './controller';
import * as Router from 'koa-router';
import { passportMiddleware } from '../../../modules/middleware';

export default (ctrl: CategoriesController) => {
  const router = new Router({
    prefix: '/categories',
  });

  router.get('/', passportMiddleware, (ctx: any) => ctrl.getList(ctx));

  return router.routes();
}
