import SearchService from './service';

export default class SearchController {
  constructor(private service: SearchService) {
  }

  async search(ctx: any) {
    const { q } = ctx.request.query;

    if (!q) {
      ctx.body = {
        count: 0,
        list: [],
      }
    }
    const res = await this.service.search(q);
    ctx.body = {
      count: res.length,
      list: res,
    };
  }

}
