import { Action, createReducer, on } from '@ngrx/store';
import {
  FollowedAccountIdsState,
  initialFollowedAccountIdsState,
} from './followed-account-ids.state';

const followedAccountIdsReducers = createReducer(
  initialFollowedAccountIdsState
);

export function followedAccountIdsReducer(
  state: FollowedAccountIdsState | undefined,
  action: Action
) {
  return followedAccountIdsReducers(state, action);
}
