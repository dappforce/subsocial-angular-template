import { contentAdapter, ContentState } from './content.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const { selectIds, selectEntities, selectAll, selectTotal } =
  contentAdapter.getSelectors();

export const selectContentState =
  createFeatureSelector<ContentState>('contents');

export const selectAllContents = createSelector(selectContentState, selectAll);

export const selectContentEntities = createSelector(
  selectContentState,
  selectEntities
);
