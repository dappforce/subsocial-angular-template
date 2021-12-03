import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { ProfileStruct } from '@subsocial/api/flat-subsocial/flatteners';

export interface ProfileState extends EntityState<ProfileStruct> {}

export const profileAdapter: EntityAdapter<ProfileStruct> =
  createEntityAdapter<ProfileStruct>();

export const initialProfileState: ProfileState =
  profileAdapter.getInitialState();
