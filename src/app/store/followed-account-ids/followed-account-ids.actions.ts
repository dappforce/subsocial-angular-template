import { createAction, props } from '@ngrx/store';
import { FollowedAccountIdsStruct } from './followed-account-ids.state';

export const getFollowedAccountIds = createAction(
  '[Followed Account Ids] Get Followed Account Ids',
  props<{ payload: { address: string } }>()
);

export const upsertFollowedAccountIds = createAction(
  '[Followed Account Ids] Upsert Followed Account Ids',
  props<{ payload: FollowedAccountIdsStruct }>()
);
