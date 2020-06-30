import CommentsService from './service';
import utils from '../../../modules/utils';

export default class CommentsController {
  constructor(private commentsService: CommentsService) {
  }

  async create(ctx: any) {
    const { postId } = ctx.params;
    const post = await this.commentsService.getById(postId);

    utils.VALIDATE(ctx, post);

    const { body } = ctx.request.body;
    const { _id: userId } = ctx.state.user;
    ctx.body = await this.commentsService.addNewComment(post, body, userId);
  }

  async deleteById(ctx: any) {
    const { commentId, postId } = ctx.params;
    const post = await this.commentsService.getById(postId);

    utils.VALIDATE(ctx, post);

    const commentIndex = findCommentIndex(post.comments, commentId);
    if (commentIndex < 0) {
      ctx.throw(404, 'Comment not found');
    }
    ctx.body = await this.commentsService.deleteComment(post, commentIndex);
  }
}

function findCommentIndex(comments: any[], commentId: string) {
  return comments.findIndex((el: any) => el._id.toString() === commentId);
}
