import { createAction, props } from '@ngrx/store';
import { ReplyIdStruct } from '../../core/types/reply-id.type';

export const getReplyIdsByParentPostId = createAction(
  '[Reply Ids] Load ReplyIds By Parent Post Id',
  props<{ id: string }>()
);

export const upsertReplyIds = createAction(
  '[Space] Upsert Reply Ids',
  props<{ payload: ReplyIdStruct }>()
);
