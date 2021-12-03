import {
  myPostReactionsAdapter,
  MyPostReactionsState,
} from './my-post-reactions.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const { selectIds, selectEntities, selectAll, selectTotal } =
  myPostReactionsAdapter.getSelectors();

export const selectMyPostReactions =
  createFeatureSelector<MyPostReactionsState>('myPostReactions');

export const selectMyPostReactionsIds = createSelector(
  selectMyPostReactions,
  selectAll
);
export const selectMyPostReactionsCount = createSelector(
  selectMyPostReactions,
  selectTotal
);
export const selectMyPostReactionsEntities = createSelector(
  selectMyPostReactions,
  selectEntities
);
