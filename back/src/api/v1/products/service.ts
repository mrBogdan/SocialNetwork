import { BaseService } from '../../../core';

type ProductsModel = any;

export default class ProductsService extends BaseService {
  constructor(productModel: ProductsModel) {
    super(productModel);
  }
}
