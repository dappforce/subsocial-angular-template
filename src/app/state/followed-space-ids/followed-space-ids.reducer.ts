import { Action, createReducer, on } from '@ngrx/store';
import {
  followedSpaceIdsAdapter,
  FollowedSpaceIdsState,
  initialFollowedSpaceIdsState,
} from './followed-space-ids.state';
import {
  getFollowedSpaceIds,
  upsertFollowedSpaceIds,
} from './followed-space-ids.actions';

const followedSpaceIdsReducers = createReducer(
  initialFollowedSpaceIdsState,
  on(getFollowedSpaceIds, (state) => state),
  on(upsertFollowedSpaceIds, (state, { payload }) => {
    return followedSpaceIdsAdapter.upsertOne(payload, state);
  })
);

export function followedSpaceIdsReducer(
  state: FollowedSpaceIdsState | undefined,
  action: Action
) {
  return followedSpaceIdsReducers(state, action);
}
