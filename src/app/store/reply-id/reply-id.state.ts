import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { ReplyIds } from '../../core/types/reply-id.type';

export interface ReplyIdState extends EntityState<ReplyIds> {}

export const replyIdAdapter: EntityAdapter<ReplyIds> =
  createEntityAdapter<ReplyIds>();

export const initialReplyIdState: ReplyIdState =
  replyIdAdapter.getInitialState();
