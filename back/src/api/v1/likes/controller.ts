import LikesService from './service';
import utils from '../../../modules/utils';

export default class LikesController {
  constructor(private likesService: LikesService) {
  }

  async like(ctx: any) {
    const { postId } = ctx.params;
    const post = await this.likesService.getById(postId);

    utils.VALIDATE(ctx, post);

    const user = ctx.state.user._id;
    if (findUserLike(post.likes, user)) {
      ctx.throw(400, 'User already liked this post');
    }

    ctx.body = await this.likesService.like(post, user);
  }

  async unlike(ctx: any) {
    const { likeId, postId } = ctx.params;
    const post = await this.likesService.getById(postId);

    utils.VALIDATE(ctx, post);

    const likeIndex = findLikeIndex(post.likes, likeId);
    ctx.body = await this.likesService.unlike(post, likeIndex);
  }
}

function findUserLike(likes: any[], userId: string) {
  return likes.find((el: any) => el.user.toString() === userId);
}

function findLikeIndex(likes: any[], likeId: string) {
  return likes.findIndex((el: any) => el._id.toString() === likeId);
}
