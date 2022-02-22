import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  followedSpaceIdsAdapter,
  FollowedSpaceIdsState,
} from './followed-space-ids.state';
import { selectMyAccountAddress } from '../my-account/my-account.selectors';

const { selectIds, selectEntities, selectAll, selectTotal } =
  followedSpaceIdsAdapter.getSelectors();

export const selectFollowedSpaceIdsState =
  createFeatureSelector<FollowedSpaceIdsState>('followedSpaceIds');

export const selectFollowedSpaceIdsEntities = createSelector(
  selectFollowedSpaceIdsState,
  selectEntities
);

export const selectFollowedSpaceIdsByCurrentAccount = createSelector(
  selectFollowedSpaceIdsEntities,
  selectMyAccountAddress,
  (entities, address) => {
    return entities ? entities[address]?.followingSpaceIds || [] : [];
  }
);
