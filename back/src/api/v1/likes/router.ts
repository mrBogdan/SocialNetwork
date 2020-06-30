import * as Router from 'koa-router';
import LikesController from './controller';
import * as passport from 'koa-passport';

export default (likesController: LikesController) => {
  const router = new Router({
    prefix: '/likes/:postId',
  });

  router.post('/',  passport.authenticate('jwt', { session: false }), likesController.like.bind(likesController));
  router.delete('/:likeId', passport.authenticate('jwt', { session: false }), likesController.unlike.bind(likesController))

  return router.routes();
}
