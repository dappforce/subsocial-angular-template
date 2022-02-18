import { Action, createReducer, on } from '@ngrx/store';
import { initialPostState, postAdapter, PostState } from './post.state';
import {
  addNewCommentPost,
  loadPostsByIds,
  switchIsChildrenCommentShow,
  updatePost,
  upsertPost,
  upsertPosts,
} from './post.actions';

const postReducers = createReducer(
  initialPostState,
  on(loadPostsByIds, (state) => state),
  on(upsertPosts, (state, { payload }) => {
    return postAdapter.upsertMany(payload, state);
  }),
  on(upsertPost, (state, { payload }) => {
    return postAdapter.upsertOne(payload, state);
  }),
  on(updatePost, (state, { payload }) => {
    return postAdapter.updateOne(payload, state);
  }),
  on(switchIsChildrenCommentShow, (state) => state),
  on(addNewCommentPost, (state) => state)
);

export function postReducer(state: PostState | undefined, action: Action) {
  return postReducers(state, action);
}
