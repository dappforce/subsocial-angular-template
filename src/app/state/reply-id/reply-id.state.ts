import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { ReplyIdStruct } from '../../core/types/reply-id.type';

export interface ReplyIdState extends EntityState<ReplyIdStruct> {}

export const replyIdAdapter: EntityAdapter<ReplyIdStruct> =
  createEntityAdapter<ReplyIdStruct>();

export const initialReplyIdState: ReplyIdState =
  replyIdAdapter.getInitialState();
