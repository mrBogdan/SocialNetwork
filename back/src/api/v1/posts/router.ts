import * as Router from 'koa-router';
import PostsController from './controller';
import * as passport from 'koa-passport';

export default (postsController: PostsController) => {
  const router = new Router({
    prefix: '/posts'
  });

  router.get('/', postsController.getList.bind(postsController));
  router.get('/:id', postsController.getById.bind(postsController));
  router.post('/', passport.authenticate('jwt', { session: false }), postsController.create.bind(postsController));
  router.delete('/:id',  passport.authenticate('jwt', { session: false }), postsController.deleteById.bind(postsController));
  router.put('/',  passport.authenticate('jwt', { session: false }), postsController.updateById.bind(postsController));

  return router.routes();
}
