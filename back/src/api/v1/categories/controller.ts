import CategoriesService from './service';
import { errorLog } from '../../../modules/utils';

export default class CategoriesController {
  constructor(private svc: CategoriesService) {
  }

  getList(ctx: any) {
    return this.svc.getList(ctx.query)
      .then((res: any) => ctx.body = res)
      .catch(errorLog);
  }
}
