import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export interface FollowedSpaceIdsState
  extends EntityState<FollowedSpaceIdsStruct> {}

export type FollowedSpaceIdsStruct = {
  id: string;
  followingAccountIds: Array<string>;
};

export const followedSpaceIdsAdapter: EntityAdapter<FollowedSpaceIdsStruct> =
  createEntityAdapter<FollowedSpaceIdsStruct>();

export const initialFollowedSpaceIdsState: FollowedSpaceIdsState =
  followedSpaceIdsAdapter.getInitialState();
