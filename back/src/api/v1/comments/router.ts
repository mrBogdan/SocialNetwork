import CommentsController from './controller';
import * as Router from 'koa-router';
import * as passport from 'koa-passport';

export default (commentsController: CommentsController) => {
  const router = new Router({
    prefix: '/comments/:postId',
  });

  router.post('/', passport.authenticate('jwt', { session: false }), commentsController.create.bind(commentsController))
  router.delete('/:commentId', passport.authenticate('jwt', { session: false }), commentsController.deleteById.bind(commentsController))

  return router.routes();
}
