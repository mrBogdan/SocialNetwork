import Router from './router';
import OrderController from './controller';
import OrderService from './service';

export default (models: any) => Router(new OrderController(new OrderService(models.Order)));
