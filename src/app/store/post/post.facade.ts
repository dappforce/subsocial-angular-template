import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../state';
import { Observable } from 'rxjs';
import {
  addNewCommentPost,
  loadPostById,
  loadPostsByIds,
  switchIsChildrenCommentShow,
  updatePost,
} from './post.actions';
import { selectPostById, selectPostsByIds } from './post.selectors';
import { Post } from '../../core/models/post/post-list-item.model';
import { takeValueOnce } from '../../core/rxjs-custom/operators';
import { Update } from '@ngrx/entity';
import { AddReplyIdProps } from '../reply-id/reply-id.actions';

@Injectable({
  providedIn: 'root',
})
export class PostFacade {
  constructor(private store: Store<AppState>) {}

  loadPost(id: string) {
    this.store.dispatch(loadPostById({ id }));
  }

  loadPosts(ids: string[], type?: 'public' | 'all') {
    this.store.dispatch(loadPostsByIds({ payload: { ids, type } }));
  }

  getPost(id: string): Observable<Post | undefined> {
    return this.store.select(selectPostById(id));
  }

  getPosts(ids: string[]): Observable<Post[]> {
    return this.store.select(selectPostsByIds(ids));
  }

  getPostOnce(id: string): Observable<Post> {
    return this.getPost(id).pipe(takeValueOnce) as Observable<Post>;
  }

  fetchPost(id: string): Observable<Post> {
    this.loadPost(id);
    return this.getPostOnce(id);
  }

  updatePost(update: Update<Post>) {
    this.store.dispatch(updatePost({ payload: update }));
  }

  increaseReplyCount(id: string) {
    this.getPostOnce(id).subscribe((post) => {
      const update: Update<Post> = {
        id: id,
        changes: { repliesCount: post.repliesCount + 1 },
      };

      this.updatePost(update);
    });
  }

  switchIsChildrenCommentShow(id: string, open?: boolean) {
    this.store.dispatch(switchIsChildrenCommentShow({ payload: { id, open } }));
  }

  addNewCommentPost(props: AddReplyIdProps) {
    this.store.dispatch(addNewCommentPost({ payload: props }));
  }

  switchVisibility(postId: string) {
    this.getPostOnce(postId).subscribe((post) => {
      const update: Update<Post> = {
        id: postId,
        changes: { hidden: !post.hidden },
      };

      this.updatePost(update);
    });
  }
}
