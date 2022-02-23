import { createAction, props } from '@ngrx/store';
import { LoadEntitiesProps } from '../types';
import { Profile } from './profile.state';
import { AccountData } from '../../core/types/account.types';

export const upsertProfiles = createAction(
  '[Profile] Upsert Profiles',
  props<{ payload: Array<Profile> }>()
);

export const upsertProfile = createAction(
  '[Profile] Upsert Profile',
  props<{ payload: Profile }>()
);

export const loadMyProfile = createAction(
  '[Profile] Load My Profile By Id',
  props<{ payload: AccountData }>()
);

export const loadProfileById = createAction(
  '[Profile] Load Profile By Id',
  props<{ id: string }>()
);

export const loadProfilesByIds = createAction(
  '[Profile] Load Profiles By Ids',
  props<{ payload: LoadEntitiesProps }>()
);

export const saveProfilesSuccess = createAction(
  '[Profile] Load Profiles Success'
);

export const saveProfileSuccess = createAction(
  '[Profile] Load Profile Success'
);

export const saveMyProfileSuccess = createAction(
  '[Profile] Load My Profile Success'
);
