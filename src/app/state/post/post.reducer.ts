import { Action, createReducer, on } from '@ngrx/store';
import { initialPostState, postAdapter, PostState } from './post.state';
import { getPostsByIds, getPostsWithAllData, upsertPosts } from "./post.actions";

const postReducers = createReducer(
  initialPostState,
  on(getPostsByIds, (state) => state),
  on(getPostsWithAllData, (state) => state),
  on(upsertPosts, (state, { payload }) => {
    return postAdapter.upsertMany(payload, state);
  })
);

export function postReducer(state: PostState | undefined, action: Action) {
  return postReducers(state, action);
}
