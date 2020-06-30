import { BaseService } from '../../../core';

export default class LikesService extends BaseService {
  constructor(postModel: any) {
    super(postModel);
  }

  like(post: any, userId: string) {
    post.likes.unshift({ user: userId });
    return post.save();
  }

  unlike(post: any, likeIndex: number) {
    post.likes.splice(likeIndex, 1);
    return post.save();
  }
}
