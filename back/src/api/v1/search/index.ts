import Router from './router';
import SearchController from './controller';
import SearchService from './service';

export default (models: any) => Router(new SearchController(new SearchService(models.User)));
