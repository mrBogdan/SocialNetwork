import Router from './router';
import ProductsController from './controller';
import ProductsService from './service';

export default (models: any) => Router(new ProductsController(new ProductsService(models.Product)));
