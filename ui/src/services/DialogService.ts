const API_PATH = '/dialogs'

export default class DialogService {
  constructor(private authHttpClient: any) {
  }

  getList() {
    return this.authHttpClient.get(API_PATH);
  }

  create(participant: string, message: string) {
    return this.authHttpClient.post(API_PATH, {
      participant,
      message
    });
  }

  getById(id: string) {
    return this.authHttpClient.get(API_PATH + '/' + id);
  }

}
