import { Action, createReducer, on } from '@ngrx/store';
import {
  initialMyPostReactionsState,
  myPostReactionsAdapter,
  MyPostReactionsState,
} from './my-post-reactions.state';
import * as MyPostReactionsActions from './my-post-reactions.actions';

const myPostReactionsReducers = createReducer(
  initialMyPostReactionsState,
  on(MyPostReactionsActions.getGetMyPostReactionsByPostIds, (state) => state),
  on(MyPostReactionsActions.upsertMyPostReactions, (state, { payload }) => {
    return myPostReactionsAdapter.upsertMany(payload, state);
  })
);

export function myPostReactionsReducer(
  state: MyPostReactionsState | undefined,
  action: Action
) {
  return myPostReactionsReducers(state, action);
}
