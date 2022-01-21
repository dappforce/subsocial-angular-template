import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ReplyIdAction from './reply-id.actions';
import { map, switchMap, take } from 'rxjs/operators';
import { from } from 'rxjs';
import { CommentService } from '../../shared/services/comment.service';
import { PostFacade } from '../post/post.facade';
import { ReplyFacade } from './reply.facade';
import { Update } from '@ngrx/entity';
import { ReplyIds } from '../../core/types/reply-id.type';

@Injectable()
export class ReplyIdEffects {
  constructor(
    private action$: Actions,
    private postFacade: PostFacade,
    private replyFacade: ReplyFacade,
    private commentService: CommentService
  ) {}

  addReplyId$ = createEffect(() =>
    this.action$.pipe(
      ofType(ReplyIdAction.addReplyId),
      switchMap(({ payload }) =>
        this.replyFacade.getReplyIdsForPost(payload.parentId).pipe(
          take(1),
          map((replyIds) => {
            let update: Update<ReplyIds>;

            if (replyIds) {
              update = {
                id: payload.parentId,
                changes: { replyIds: [payload.replyId, ...replyIds!.replyIds] },
              };
            } else {
              update = {
                id: payload.parentId,
                changes: { replyIds: [payload.replyId] },
              };
            }
            return ReplyIdAction.updateReplyIds({ payload: update });
          })
        )
      )
    )
  );

  loadReplyIds$ = createEffect(() =>
    this.action$.pipe(
      ofType(ReplyIdAction.loadReplyIdsByParentPostId),
      switchMap(({ id }) =>
        from(this.commentService.getPostReplyId(id)).pipe(
          map((replyIds) => ReplyIdAction.upsertReplyIds({ payload: replyIds }))
        )
      )
    )
  );
}
