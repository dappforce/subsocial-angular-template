import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectPostIds } from '../post/post.selectors';
import { AppState } from '../state';
import { selectMyPostReactionsByPostId } from './my-post-reactions.selectors';
import { take } from 'rxjs/operators';
import { getGetMyPostReactionsByPostIds } from './my-post-reactions.actions';

@Injectable({
  providedIn: 'root',
})
export class MyPostReactionFacade {
  constructor(private store: Store<AppState>) {}

  getReactionByPostId(accountId: string, postId: string) {
    return this.store.select(selectMyPostReactionsByPostId(accountId, postId));
  }

  reloadReactionForAllPosts() {
    this.store
      .select(selectPostIds)
      .pipe(take(1))
      .subscribe((ids) => {
        this.store.dispatch(
          getGetMyPostReactionsByPostIds({ ids: ids as string[] })
        );
      });
  }

  loadMyPostReactionIds(postIds: string[]) {
    this.store.dispatch(getGetMyPostReactionsByPostIds({ ids: postIds }));
  }
}
