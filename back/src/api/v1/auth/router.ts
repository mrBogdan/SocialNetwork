import * as Router from 'koa-router';
import AuthController from './controller';

export default (authController: AuthController) => {
  const router = new Router({
    prefix: '/auth',
  });

  router.post('/register', authController.register.bind(authController));
  router.post('/login', authController.login.bind(authController));

  return router.routes();
}
