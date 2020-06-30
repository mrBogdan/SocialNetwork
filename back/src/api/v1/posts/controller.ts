import PostsService from './service';

export default class PostsController {
  constructor(private postsService: PostsService) {
  }

  async getList(ctx: any) {
    const { query } = ctx;
    ctx.body = await this.postsService.getList(query);
  }

  async getById(ctx: any) {
    const { id } = ctx.params;
    const post = await this.postsService.getById(id);

    if (post) {
      ctx.body = post;
    } else {
      ctx.throw(404, 'Post not found');
    }
  }

  async deleteById(ctx: any) {
    const { id: postId } = ctx.params;
    const userId = ctx.state.user._id;
    await this.postsService.deleteById(postId);
    ctx.body = { message: 'Post was removed' };
  }

  async create(ctx: any) {
    const { body, wall } = ctx.request.body;
    const { user } = ctx.state;

    ctx.body = this.postsService.create({ body, wall, user: user._id });
    ctx.status = 201;
  }

  async updateById(ctx: any) {
    const { _id, body } = ctx.request.body;
    const userId = ctx.state.user._id;
    ctx.body = await this.postsService.updateById(_id, userId, body);
  }
}
