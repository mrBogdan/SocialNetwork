import SearchController from './controller';
import * as Router from 'koa-router';
import { passportMiddleware } from '../../../modules/middleware';

export default function (ctrl: SearchController) {
  const router = new Router({
    prefix: '/search',
  });

  router.get('/', passportMiddleware, (ctx: any) => ctrl.search(ctx));

  return router.routes();
}
