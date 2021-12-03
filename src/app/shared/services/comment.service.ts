import { Injectable } from '@angular/core';
import { SubsocialApiService } from './subsocial-api.service';
import { ReplyIdStruct } from '../../core/types/reply-id.type';
import { ConvertService } from './convert.service';
import { StoreService } from '../../state/store.service';
import { selectCommentItemsData } from '../../state/reply-id/reply-id.selectors';
import { getReplyIdsByParentPostId } from '../../state/reply-id/reply-id.actions';
import { loadPostsSuccess } from '../../state/post/post.actions';
import { CommentItemData } from '../../core/types/comment-data.type';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(
    private api: SubsocialApiService,
    private convert: ConvertService,
    private storeService: StoreService
  ) {}

  public async getPostReplyId(postId: string): Promise<ReplyIdStruct> {
    const ids = await this.api.api.subsocial.substrate.getReplyIdsByPostId(
      this.convert.convertToBN(postId)
    );

    return { id: postId, replyIds: ids.map((id) => id.toString()) };
  }

  public async getOrLoadCommentDataByPostId(postId: string) {
    return (await this.storeService.getOrLoadEntities(
      selectCommentItemsData,
      getReplyIdsByParentPostId,
      loadPostsSuccess,
      postId,
      { id: postId }
    )) as CommentItemData[];
  }
}
