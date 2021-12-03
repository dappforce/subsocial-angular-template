import { createAction, props } from '@ngrx/store';
import { ProfileStruct } from '@subsocial/api/flat-subsocial/flatteners';
import { LoadEntitiesProps } from '../types';

export const upsertProfiles = createAction(
  '[Profile] Upsert Profiles',
  props<{ payload: Array<ProfileStruct> }>()
);

export const upsertProfile = createAction(
  '[Profile] Upsert Profile',
  props<{ payload: ProfileStruct }>()
);

export const loadMyProfile = createAction(
  '[Profile] Load My Profile By Id',
  props<{ id: string }>()
);

export const loadProfile = createAction(
  '[Profile] Load Profile By Id',
  props<{ id: string }>()
);

export const loadProfiles = createAction(
  '[Profile] Load Profiles By Ids',
  props<{ payload: LoadEntitiesProps }>()
);

export const saveProfilesSuccess = createAction(
  '[Profile] Load Profiles Success'
);
