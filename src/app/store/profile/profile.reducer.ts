import { Action, createReducer, on } from '@ngrx/store';
import {
  initialProfileState,
  profileAdapter,
  ProfileState,
} from './profile.state';
import { upsertProfile, upsertProfiles } from './profile.actions';

const profileReducers = createReducer(
  initialProfileState,
  on(upsertProfiles, (state, { payload }) => {
    return profileAdapter.upsertMany(payload, state);
  }),
  on(upsertProfile, (state, { payload }) => {
    return profileAdapter.upsertOne(payload, state);
  })
);

export function profileReducer(
  state: ProfileState | undefined,
  action: Action
) {
  return profileReducers(state, action);
}
