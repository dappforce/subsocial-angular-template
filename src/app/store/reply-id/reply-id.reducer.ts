import {
  initialReplyIdState,
  replyIdAdapter,
  ReplyIdState,
} from './reply-id.state';
import { Action, createReducer, on } from '@ngrx/store';
import {
  loadReplyIdsByParentPostId,
  updateReplyIds,
  upsertReplyIds,
} from './reply-id.actions';

const replyIdsReducers = createReducer(
  initialReplyIdState,
  on(loadReplyIdsByParentPostId, (state) => state),
  on(upsertReplyIds, (state, { payload }) => {
    return replyIdAdapter.upsertOne(payload, state);
  }),
  on(updateReplyIds, (state, { payload }) => {
    return replyIdAdapter.updateOne(payload, state);
  })
);

export function replyIdReducer(
  state: ReplyIdState | undefined,
  action: Action
) {
  return replyIdsReducers(state, action);
}
