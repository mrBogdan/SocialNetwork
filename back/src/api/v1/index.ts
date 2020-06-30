import * as Router from 'koa-router';

import Auth from './auth';
import Posts from './posts';
import Likes from './likes';
import Comments from './comments';
import Relation from './relations';
import User from './user';
import Dialogs from './dialogs';
import Search from './search';
import Products from './products';
import Categories from './categories';
import Orders from './orders';

export default (models: any, config: any) => {
  const router = new Router({
    prefix: '/api/v1',
  });

  router.use(
    Auth(models, config),
    Posts(models),
    Likes(models),
    Comments(models),
    Relation(models),
    User(models),
    Dialogs(models),
    Search(models),
    Products(models),
    Categories(models),
    Orders(models),
  );

  return router;
};
