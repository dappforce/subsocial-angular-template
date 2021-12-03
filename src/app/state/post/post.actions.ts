import { createAction, props } from '@ngrx/store';
import { PostStruct } from '@subsocial/api/flat-subsocial/flatteners';
import { AnyPostId } from '@subsocial/types';
import { LoadEntitiesProps } from '../types';

export const getPostsByIds = createAction(
  '[Post] Load Posts By Ids',
  props<{ payload: LoadEntitiesProps }>()
);

export const getPostById = createAction(
  '[Post] Load Post By Id',
  props<{ id: string }>()
);

export const getPostsWithAllData = createAction(
  '[Post] Load Posts By Ids',
  props<{ ids: Array<string> }>()
);

export const upsertPosts = createAction(
  '[Post] Upsert Posts',
  props<{ payload: Array<PostStruct> }>()
);

export const upsertPost = createAction(
  '[Post] Upsert Post',
  props<{ payload: PostStruct }>()
);

export const loadPostById = createAction(
  '[Post] Load Post By Id',
  props<{ id: string }>()
);

export const loadPostsSuccess = createAction('[Post] Load Posts Success');
