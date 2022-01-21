import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../state';
import {
  addReplyId,
  AddReplyIdProps,
  loadReplyIdsByParentPostId,
} from './reply-id.actions';
import {
  selectCommentPostsByPostId,
  selectReplyIdsByPostId,
} from './reply-id.selectors';
import {
  isNotEmptyOrNull,
  takeValueOnce,
} from '../../core/rxjs-custom/operators';
import { filter } from 'rxjs/operators';
import { Observable } from "rxjs";
import { Post } from "../../core/models/post/post-list-item.model";

@Injectable({
  providedIn: 'root',
})
export class ReplyFacade {
  constructor(private store: Store<AppState>) {}

  loadReplyIdsForPost(postId: string) {
    this.store.dispatch(loadReplyIdsByParentPostId({ id: postId }));
  }

  getReplyPostByRootPostId(rootId: string): Observable<Post[]> {
    return this.store
      .select(selectCommentPostsByPostId(rootId))
      .pipe(filter(isNotEmptyOrNull));
  }

  getReplyIdsForPost(postId: string) {
    return this.store.select(selectReplyIdsByPostId(postId));
  }

  addReplyIdForPost(props: AddReplyIdProps) {
    this.store.dispatch(addReplyId({ payload: props }));
  }
}
