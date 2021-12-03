import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PostService } from '../../post/services/post.service';
import * as PostActions from './post.actions';
import * as ContentActions from '../content/content.actions';
import * as SpaceActions from '../space/space.actions';
import * as ProfileActions from '../profile/profile.actions';
import * as LoaderActions from '../loader/loader.actions';
import * as MyPostReactionsActions from '../my-post-reactions/my-post-reactions.actions';
import {
  concatMap,
  first,
  map,
  mergeMap,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';
import { from } from 'rxjs';
import * as ReplyIdAction from '../reply-id/reply-id.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../state';
import { selectNonExistingPostIds } from './post.selectors';

@Injectable()
export class PostEffects {
  constructor(
    private action$: Actions,
    private postService: PostService,
    private store: Store<AppState>
  ) {}

  loadPosts$ = createEffect(() =>
    this.action$.pipe(
      ofType(PostActions.getPostsByIds),
      mergeMap(({ payload }) =>
        this.store.select(selectNonExistingPostIds(payload.ids)).pipe(
          take(1),
          map((ids) => {
            return { ids: ids, type: payload.type };
          })
        )
      ),
      tap((data) =>
        this.store.dispatch(
          MyPostReactionsActions.getGetMyPostReactionsByPostIds({
            ids: data.ids,
          })
        )
      ),
      concatMap((data) =>
        from(this.postService.getPostsWithAllData(data.ids, data.type)).pipe(
          switchMap((postsData) => [
            ContentActions.upsertContents({ payload: postsData.contents }),
            SpaceActions.upsertSpaces({ payload: postsData.spaces }),
            ProfileActions.upsertProfiles({ payload: postsData.profiles }),
            PostActions.upsertPosts({ payload: postsData.posts }),
            PostActions.loadPostsSuccess(),
          ])
        )
      )
    )
  );

  loadReplyPosts$ = createEffect(() =>
    this.action$.pipe(
      ofType(ReplyIdAction.upsertReplyIds),
      map(({ payload }) =>
        PostActions.getPostsByIds({ payload: { ids: payload.replyIds } })
      )
    )
  );
}
