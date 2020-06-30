import Router from './router';
import PostsController from './controller';
import PostsService from './service';

export default (models: any) => Router(new PostsController(new PostsService(models.Post)))
