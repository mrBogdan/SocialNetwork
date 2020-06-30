import ProductsService from './service';
import utils, { errorLog } from '../../../modules/utils';

type Product = any;

export default class ProductsController {
  constructor(private svc: ProductsService) {
  }

  create(ctx: any) {
    const {
      name,
      category,
      description,
      price,
    } = ctx.request.body;
    const product_owner = ctx.state.user._id;
    const photo = ctx.request.file.path;

    return this.svc.create({
      name,
      category,
      description,
      price,
      product_owner,
      photo
    })
      .then(() => ctx.status = 201)
      .catch(errorLog);
  }

  getById(ctx: any) {
    return this.svc.getById(ctx.params.id, {
      path: 'category',
      model: 'categories'
    })
      .then((item: Product) => utils.VALIDATE(ctx, item))
      .then((item: Product) => ctx.body = item)
      .catch(errorLog);
  }

  getList(ctx: any) {
    const query = ctx.query;
    return this.svc.getList(query,  {
      path: 'category',
      model: 'categories'
    })
      .then((res: any) => ctx.body = res)
      .catch(errorLog);
  }

  remove(ctx: any) {
    const id = ctx.params.id;
    return this.svc
      .deleteById(id)
      .then(() => ctx.status = 200)
      .catch(errorLog);
  }

  update(ctx: any) {
    const productId = ctx.params.id;
    const {
      name,
      category,
      description,
      price,
    } = ctx.request.body;
    const product_owner = ctx.state.user._id;
    const photo = ctx.request.file ? ctx.request.file.path : null;

    const updateParams = photo ? {
      name,
      category,
      description,
      price,
      photo,
    } : {
      name,
      category,
      description,
      price,
    }

    return this.svc
      .findOneAndUpdate({
        product_owner,
        _id: productId,
      }, updateParams)
      .then(() => ctx.status = 200)
      .catch(errorLog);
  }
}
