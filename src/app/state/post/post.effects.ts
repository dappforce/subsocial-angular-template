import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PostService } from '../../post/services/post.service';
import * as PostActions from './post.actions';
import * as MyPostReactionsActions from '../my-post-reactions/my-post-reactions.actions';
import { concatMap, filter, map, switchMap, take, tap } from 'rxjs/operators';
import { from, of } from 'rxjs';
import * as ReplyIdAction from '../reply-id/reply-id.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../state';
import { ReplyFacade } from '../reply-id/reply.facade';
import { PostFacade } from './post.facade';
import { Update } from '@ngrx/entity';
import { Post } from '../../core/models/post/post-list-item.model';
import { updatePost } from './post.actions';
import { selectCommentPostsByPostId } from '../reply-id/reply-id.selectors';

@Injectable()
export class PostEffects {
  constructor(
    private action$: Actions,
    private postService: PostService,
    private replyFacade: ReplyFacade,
    private postFacade: PostFacade,
    private store: Store<AppState>
  ) {}

  loadPosts$ = createEffect(() =>
    this.action$.pipe(
      ofType(PostActions.loadPostsByIds),
      tap(({ payload }) =>
        this.store.dispatch(
          MyPostReactionsActions.getGetMyPostReactionsByPostIds({
            ids: payload.ids,
          })
        )
      ),
      concatMap(({ payload }) =>
        from(this.postService.loadPostsByIds(payload.ids, payload.type)).pipe(
          switchMap((postsData) => [
            PostActions.upsertPosts({ payload: postsData }),
          ])
        )
      )
    )
  );

  loadPostEffect$ = createEffect(() =>
    this.action$.pipe(
      ofType(PostActions.loadPostById),
      tap(({ id }) =>
        this.store.dispatch(
          MyPostReactionsActions.getGetMyPostReactionsByPostIds({
            ids: [id],
          })
        )
      ),
      switchMap(({ id }) => from(this.postService.loadPostById(id, 'all'))),
      filter((post) => !!post),
      map((post) => PostActions.upsertPost({ payload: post! }))
    )
  );

  switchIsChildrenCommentShow$ = createEffect(() =>
    this.action$.pipe(
      ofType(PostActions.switchIsChildrenCommentShow),
      switchMap(({ payload }) =>
        this.postFacade.getPostOnce(payload.id).pipe(
          tap((post) => {
            const isChildrenCommentShow =
              payload.open || !post.isChildrenCommentShow;
            const update: Update<Post> = {
              id: post.id,
              changes: { isChildrenCommentShow },
            };
            this.store.dispatch(updatePost({ payload: update }));
          }),
          concatMap((post) => {
            if (!post.isChildrenCommentShow) {
              return this.store
                .select(selectCommentPostsByPostId(post.id))
                .pipe(
                  take(1),
                  map((posts) =>
                    Array.isArray(posts) && posts.length === 0 ? post.id : null
                  )
                );
            } else {
              return of(null);
            }
          }),
          filter((id) => !!id),
          map((id) => ReplyIdAction.loadReplyIdsByParentPostId({ id: id! }))
        )
      )
    )
  );

  addNewCommentPost$ = createEffect(() =>
    this.action$.pipe(
      ofType(PostActions.addNewCommentPost),
      tap(({ payload }) => this.postFacade.loadPost(payload.replyId)),
      tap(({ payload }) =>
        this.postFacade.increaseReplyCount(payload.parentId)
      ),
      switchMap((props) => [
        ReplyIdAction.addReplyId({ payload: props.payload }),
        PostActions.switchIsChildrenCommentShow({
          payload: { id: props.payload.parentId, open: true },
        }),
      ])
    )
  );

  loadReplyPosts$ = createEffect(() =>
    this.action$.pipe(
      ofType(ReplyIdAction.upsertReplyIds),
      map(({ payload }) =>
        PostActions.loadPostsByIds({
          payload: { ids: payload.replyIds, reload: true, type: 'all' },
        })
      )
    )
  );
}
