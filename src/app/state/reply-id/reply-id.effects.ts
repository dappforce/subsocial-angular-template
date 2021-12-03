import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PostService } from '../../post/services/post.service';
import * as ReplyIdAction from './reply-id.actions';
import { map, switchMap, tap } from 'rxjs/operators';
import { from } from 'rxjs';
import { CommentService } from '../../shared/services/comment.service';

@Injectable()
export class ReplyIdEffects {
  constructor(
    private action$: Actions,
    private commentService: CommentService
  ) {}

  loadReplyIds$ = createEffect(() =>
    this.action$.pipe(
      ofType(ReplyIdAction.getReplyIdsByParentPostId),
      switchMap(({ id }) =>
        from(this.commentService.getPostReplyId(id)).pipe(
          map((replyIds) => ReplyIdAction.upsertReplyIds({ payload: replyIds }))
        )
      )
    )
  );
}
