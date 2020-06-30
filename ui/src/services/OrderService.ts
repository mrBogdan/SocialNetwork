import { concatQueryParams } from '@/utils';
import AuthService from '@/services/AuthService';

const API_PATH = '/orders';

export default class OrderService {
  constructor(private authHttpService: any) {
  }

  create(orderParams: any) {
    return this.authHttpService.post(API_PATH, orderParams);
  }

  userOrders() {
    return this.authHttpService.get(API_PATH + '?' + concatQueryParams({
      user: AuthService.parseCurrentToken().id,
    }));
  }

  getProductOwnerOrders() {
    return this.authHttpService.get(API_PATH + '?' + concatQueryParams({
      product_owner: AuthService.parseCurrentToken().id,
    }));
  }

  updateStatusOrder(orderId: string, status: number) {
    return this.authHttpService.put(API_PATH + '/' + orderId, {
      status,
    });
  }
}
