import Router from './router';
import AuthController from './controller';
import UserService from './service';

export default (models: any, config: any) => Router(new AuthController(new UserService(models.User), config));
