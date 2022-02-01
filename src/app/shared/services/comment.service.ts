import { Injectable } from '@angular/core';
import { SubsocialApiService } from './subsocial-api.service';
import { ReplyIds } from '../../core/types/reply-id.type';
import { ConvertService } from './convert.service';
import { StoreService } from '../../state/store.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(
    private api: SubsocialApiService,
    private convert: ConvertService
  ) {}

  public async getPostReplyId(postId: string): Promise<ReplyIds> {
    const ids = await this.api.api.subsocial.substrate.getReplyIdsByPostId(
      this.convert.convertToBN(postId)
    );

    return { id: postId, replyIds: ids.map((id) => id.toString()) };
  }
}
