import { AUTH_HTTP_CLIENT, concatQueryParams } from '@/utils';

const API_PATH = '/search';

export default class SearchService {
  constructor(private authHttpClient: any) {
  }

  search(q: any) {
    return this.authHttpClient.get(API_PATH + '?' + concatQueryParams(q));
  }

  static createInstance() {
    return new SearchService(AUTH_HTTP_CLIENT());
  }
}


