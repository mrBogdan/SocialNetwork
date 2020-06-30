import OrderService from './service';
import { errorLog } from '../../../modules/utils';

export default class OrderController {
  constructor(private svc: OrderService) {
  }

  create(ctx: any) {
    const createParams = ctx.request.body;

    return this.svc.create(createParams)
      .then((res: any) => ctx.body = res)
      .catch(errorLog);
  }

  getList(ctx: any) {
    const query = ctx.query;
    return this.svc.getList(query, [{
      path: 'products',
      model: 'products'
    }, {
      path: 'user',
      model: 'users'
    }])
      .then((res) => ctx.body = res)
      .catch(errorLog);
  }

  getById(ctx: any) {
    const id = ctx.params.id;
    return this.svc.getById(id)
      .then((res: any) => ctx.body = res)
      .catch(errorLog);
  }

  update(ctx: any) {
    const orderId = ctx.params.id;
    const product_owner = ctx.state.user._id;
    const updateParams = ctx.request.body;
    return this.svc.findOneAndUpdate({
      _id: orderId,
      product_owner
    }, updateParams, { new: true }, {
      path: 'products',
      model: 'products',
    })
      .then((res: any) => ctx.body = res)
      .catch(errorLog);
  }

  remove(ctx: any) {
    const id = ctx.params.id;
    return this.svc.deleteById(id)
      .then(() => ctx.status = 200)
      .catch(errorLog);
  }

}
