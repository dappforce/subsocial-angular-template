import { createAction, props } from '@ngrx/store';
import { LoadEntitiesProps } from '../types';
import { Post } from '../../core/models/post/post-list-item.model';
import { Update } from '@ngrx/entity';
import { AddReplyIdProps } from '../reply-id/reply-id.actions';

export const loadPostsByIds = createAction(
  '[Post] Load Posts By Ids',
  props<{ payload: LoadEntitiesProps }>()
);

export const loadPostById = createAction(
  '[Post] Load Post By Id',
  props<{ id: string }>()
);

export const upsertPosts = createAction(
  '[Post] Upsert Posts',
  props<{ payload: Array<Post> }>()
);

export const upsertPost = createAction(
  '[Post] Upsert Post',
  props<{ payload: Post }>()
);

export const updatePost = createAction(
  '[Post] Update Post',
  props<{ payload: Update<Post> }>()
);

export const switchIsChildrenCommentShow = createAction(
  '[Post] Switch Is Children Comment Show',
  props<{ payload: { id: string; open?: boolean } }>()
);

export const addNewCommentPost = createAction(
  '[Post] Add New Comment Post',
  props<{ payload: AddReplyIdProps }>()
);
