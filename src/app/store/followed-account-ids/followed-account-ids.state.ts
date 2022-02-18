import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export interface FollowedAccountIdsState extends EntityState<FollowedAccountIdsStruct> {}

export type FollowedAccountIdsStruct = {
  id: string;
  followingAccountIds: Array<string>;
}

export const followedAccountIdsAdapter: EntityAdapter<FollowedAccountIdsStruct> =
  createEntityAdapter<FollowedAccountIdsStruct>();

export const initialFollowedAccountIdsState: FollowedAccountIdsState =
  followedAccountIdsAdapter.getInitialState();
