import { createAction, props } from '@ngrx/store';
import { SpaceStruct } from '@subsocial/api/flat-subsocial/flatteners';
import { LoadEntitiesProps } from '../types';

export const getSpacesByIds = createAction(
  '[Space] Load Spaces By Ids',
  props<{ payload: LoadEntitiesProps }>()
);

export const upsertSpaces = createAction(
  '[Space] Upsert Spaces',
  props<{ payload: Array<SpaceStruct> }>()
);

export const upsertSpace = createAction(
  '[Space] Upsert Space',
  props<{ payload: SpaceStruct }>()
);

export const loadSpaceById = createAction(
  '[Space] Load Space By Id',
  props<{ id: string }>()
);

export const loadSpaceSuccess = createAction('[Space] Load Spaces Success');
