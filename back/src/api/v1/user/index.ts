import Router from './router';
import UserController from './controller';
import UserService from './service';

export default (models: any) => Router(new UserController(new UserService(models.User)));
