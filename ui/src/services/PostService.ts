import { concatQueryParams } from '@/utils';

export default class PostService {
  constructor(private authHttpClient: any) {
  }

  addComment(postId: string, body: string) {
    return this.authHttpClient.post('/comments/' + postId, {
      body,
    });
  }

  removeComment(postId: string, commentId: string) {
    return this.authHttpClient.delete('/comments/' + postId + '/' + commentId);
  }

  getPostById(postId: string) {
    return this.authHttpClient.get('/posts/' + postId);
  }

  createPost(body: string, wall: string) {
    return this.authHttpClient.post('/posts', {
      body,
      wall,
    });
  }

  deleteOne(postId: string) {
    return this.authHttpClient.delete('/posts/' + postId);
  }

  getUserPostList(wall: string) {
    const options = {
      wall,
    };
    return this.authHttpClient.get('/posts?' + concatQueryParams(options));
  }
}
