import { createAction, props } from '@ngrx/store';
import { MyPostReactionsStruct } from './my-post-reactions.state';

export const getGetMyPostReactionsByPostIds = createAction(
  '[My Post Reactions] My Post Reactions By Post Ids',
  props<{ ids: Array<string> }>()
);

export const upsertMyPostReactions = createAction(
  '[My Post Reactions] Upsert My Post Reactions',
  props<{ payload: Array<MyPostReactionsStruct> }>()
);
