import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { PostStruct } from '@subsocial/api/flat-subsocial/flatteners';

export interface PostState extends EntityState<PostStruct> {}

export const postAdapter: EntityAdapter<PostStruct> =
  createEntityAdapter<PostStruct>();

export const initialPostState: PostState = postAdapter.getInitialState();
