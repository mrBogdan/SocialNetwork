import { BaseService } from '../../../core';

export default class CommentsService extends BaseService {
  constructor(postModel: any) {
    super(postModel);
  }

  addNewComment(post: any, body: string, user: string) {
    post.comments.unshift({ body, user });
    return post.save();
  }

  deleteComment(post: any, commentIndex: number) {
    post.comments.splice(commentIndex, 1);
    return post.save();
  }
}
