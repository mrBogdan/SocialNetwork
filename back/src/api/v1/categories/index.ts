import Router from './router';
import CategoriesService from './service';
import CategoriesController from './controller';

export default (models: any) => Router(new CategoriesController(new CategoriesService(models.Category)));
