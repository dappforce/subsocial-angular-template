import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { LoadEntitiesProps } from '../types';
import { Space } from './space.state';

export const loadSpacesByIds = createAction(
  '[Space] Load Spaces By Ids',
  props<{ payload: LoadEntitiesProps }>()
);

export const upsertSpaces = createAction(
  '[Space] Upsert Spaces',
  props<{ payload: Array<Space> }>()
);

export const upsertSpace = createAction(
  '[Space] Upsert Space',
  props<{ payload: Space | undefined }>()
);

export const updateSpace = createAction(
  '[Space] Update Space',
  props<{ payload: Update<Space> }>()
);

export const loadSpaceById = createAction(
  '[Space] Load Space By Id',
  props<{ id: string }>()
);

export const loadSpaceSuccess = createAction('[Space] Load Spaces Success');
