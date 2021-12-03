import { spaceAdapter, SpaceState } from './space.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectContentEntities } from '../content/content.selectors';
import {
  SpaceContentExtend,
  SpaceListItemData,
} from '../../core/models/space/space-list-item.model';
import { SpaceContent } from '@subsocial/api/flat-subsocial/dto';
import { KeyValuePair } from '../../core/models/key-value-pair.model';

const { selectIds, selectEntities, selectAll, selectTotal } =
  spaceAdapter.getSelectors();

export const selectSpaceState = createFeatureSelector<SpaceState>('spaces');

export const selectAllSpaces = createSelector(selectSpaceState, selectAll);
export const selectSpacesCount = createSelector(selectSpaceState, selectTotal);
export const selectSpaceEntities = createSelector(
  selectSpaceState,
  selectEntities
);

export const selectSpaceById = (id: string) =>
  createSelector(
    selectSpaceEntities,
    selectContentEntities,
    (spaceEntities, contentEntities) => {
      const struct = spaceEntities[id];
      if (struct && struct.contentId) {
        const content = contentEntities[struct.contentId] as SpaceContentExtend;
        return content ? ({ struct, content } as SpaceListItemData) : undefined;
      }
      return undefined;
    }
  );

export const selectSpacesByIds = (ids: string[]) =>
  createSelector(
    selectSpaceEntities,
    selectContentEntities,
    (spaceEntities, contentEntities) => {
      const spaceDataArray: KeyValuePair<SpaceListItemData> = {};
      ids.forEach((id) => {
        const struct = spaceEntities[id];
        if (struct?.contentId) {
          const content = contentEntities[
            struct.contentId
          ] as SpaceContentExtend;
          if (content) {
            const spaceListData: SpaceListItemData = {
              struct,
              content,
              id: struct.id,
            };

            spaceDataArray[struct.id] = spaceListData;
          }
        }
      });

      return spaceDataArray;
    }
  );

export const selectSpaceWithContent = (start: number, end: number) =>
  createSelector(
    selectAllSpaces,
    selectContentEntities,
    (spacesArray, contentEntities) => {
      const spaceData: SpaceListItemData[] = [];

      spacesArray.slice(start, end).map((struct) => {
        if (struct.contentId) {
          const content = contentEntities[
            struct.contentId
          ] as SpaceContentExtend;
          content ? spaceData.push({ struct, content, id: struct.id }) : null;
        }
      });

      return spaceData;
    }
  );
