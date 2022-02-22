import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export type Profile = {
  id: string;
  followersCount: number;
  followingAccountsCount: number;
  followingSpacesCount: number;
  about: string;
  avatar: string;
  name: string;
  summary: string;
  isShowMore: boolean;
};

export interface ProfileState extends EntityState<Profile> {}

export const profileAdapter: EntityAdapter<Profile> =
  createEntityAdapter<Profile>();

export const initialProfileState: ProfileState =
  profileAdapter.getInitialState();
