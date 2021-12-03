import {
  initialReplyIdState,
  replyIdAdapter,
  ReplyIdState,
} from './reply-id.state';
import { Action, createReducer, on } from '@ngrx/store';
import { getReplyIdsByParentPostId, upsertReplyIds } from './reply-id.actions';

const replyIdsReducers = createReducer(
  initialReplyIdState,
  on(getReplyIdsByParentPostId, (state) => state),
  on(upsertReplyIds, (state, { payload }) => {
    return replyIdAdapter.upsertOne(payload, state);
  })
);

export function replyIdReducer(
  state: ReplyIdState | undefined,
  action: Action
) {
  return replyIdsReducers(state, action);
}
