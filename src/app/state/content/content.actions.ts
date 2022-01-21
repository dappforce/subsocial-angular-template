import { createAction, props } from '@ngrx/store';
import { Content } from '../../core/types/content.type';

export const saveContent = createAction(
  '[Content] Save Content',
  props<{ payload: Content }>()
);

export const saveContents = createAction(
  '[Content] Save Contents',
  props<{ payload: Array<Content> }>()
);

export const upsertContents = createAction(
  '[Content] Upsert Contents',
  props<{ payload: Array<Content> }>()
);

export const upsertContent = createAction(
  '[Content] Upsert Content',
  props<{ payload: Content }>()
);
