import { createAction, props } from '@ngrx/store';
import { ReplyIds } from '../../core/types/reply-id.type';
import { Update } from '@ngrx/entity';

export type AddReplyIdProps = {
  replyId: string;
  parentId: string;
};

export const loadReplyIdsByParentPostId = createAction(
  '[Reply Ids] Load ReplyIds By Parent Post Id',
  props<{ id: string }>()
);

export const upsertReplyIds = createAction(
  '[Reply Ids] Upsert Reply Ids',
  props<{ payload: ReplyIds }>()
);

export const addReplyId = createAction(
  '[Reply Ids] Add Reply Id To Post',
  props<{ payload: AddReplyIdProps }>()
);

export const updateReplyIds = createAction(
  '[Reply Ids] Update Reply Ids',
  props<{ payload: Update<ReplyIds> }>()
);
