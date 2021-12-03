import { createAction, props } from '@ngrx/store';
import { Content } from '../../core/types/content.type';

export const upsertContents = createAction(
  '[Content] Upsert Contents',
  props<{ payload: Array<Content> }>()
);

export const upsertContent = createAction(
  '[Content] Upsert Content',
  props<{ payload: Content }>()
);
