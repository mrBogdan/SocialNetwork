import { prepareFormData, Raw } from '@/services/ProductService';

const API_PATH = '/users';

export default class UserService {
  constructor(private authHttpClient: any) {
  }

  getList() {
    return this.authHttpClient.get(API_PATH);
  }

  getById(id: string) {
    return this.authHttpClient.get(API_PATH + '/' + id);
  }

  update(id: string, raw: Raw) {
    return this.authHttpClient.put(API_PATH + '/' + id, prepareFormData(raw.fields, raw.file));
  }
}
