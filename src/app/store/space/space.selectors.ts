import { Space, spaceAdapter, SpaceState } from './space.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { KeyValuePair } from '../../core/models/key-value-pair.model';
import { dictionaryToArray } from "../../core/utils";

const { selectEntities, selectAll, selectTotal } = spaceAdapter.getSelectors();

export const selectSpaceState = createFeatureSelector<SpaceState>('spaces');

export const selectAllSpaces = createSelector(selectSpaceState, selectAll);
export const selectSpacesCount = createSelector(selectSpaceState, selectTotal);
export const selectSpaceEntities = createSelector(
  selectSpaceState,
  selectEntities
);

export const selectSpaceById = (id: string) =>
  createSelector(selectSpaceEntities, (spaceEntities) => {
    return spaceEntities[id];
  });

export const selectSpaceEntitiesByIds = (ids: string[]) =>
  createSelector(selectSpaceEntities, (spaceEntities) => {
    const spaceDataArray: KeyValuePair<Space> = {};
    ids.forEach((id) => {
      const space = spaceEntities[id];
      space ? (spaceDataArray[id] = space) : null;
    });

    return spaceDataArray;
  });

export const selectSpacesByIds = (ids: string[]) =>
  createSelector(selectSpaceEntities, (spaceEntities) =>
    dictionaryToArray<Space>(spaceEntities, ids))
