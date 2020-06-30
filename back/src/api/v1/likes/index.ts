import Router from './router';
import CommentsController from './controller';
import CommentsService from './service';

export default (models: any) => Router(new CommentsController(new CommentsService(models.Post)))
