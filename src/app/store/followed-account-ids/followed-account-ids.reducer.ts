import { Action, createReducer, on } from '@ngrx/store';
import {
  followedAccountIdsAdapter,
  FollowedAccountIdsState,
  initialFollowedAccountIdsState,
} from './followed-account-ids.state';
import {
  getFollowedAccountIds,
  upsertFollowedAccountIds,
} from './followed-account-ids.actions';

const followedAccountIdsReducers = createReducer(
  initialFollowedAccountIdsState,
  on(getFollowedAccountIds, (state) => state),
  on(upsertFollowedAccountIds, (state, { payload }) => {
    return followedAccountIdsAdapter.upsertOne(payload, state);
  })
);

export function followedAccountIdsReducer(
  state: FollowedAccountIdsState | undefined,
  action: Action
) {
  return followedAccountIdsReducers(state, action);
}
