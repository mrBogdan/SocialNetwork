const API_PATH = '/categories';

export default class CategoryService {
  constructor(private authHttpClient: any) {
  }


  getList() {
    return this.authHttpClient.get(API_PATH);
  }
}
