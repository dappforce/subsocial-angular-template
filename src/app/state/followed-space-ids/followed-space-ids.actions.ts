import { createAction, props } from '@ngrx/store';
import { FollowedSpaceIdsStruct } from './followed-space-ids.state';

export const getFollowedSpaceIds = createAction(
  '[Followed Space Ids] Get Followed Space Ids',
  props<{ payload: { address: string } }>()
);

export const upsertFollowedSpaceIds = createAction(
  '[Followed Space Ids] Upsert Followed Space Ids',
  props<{ payload: FollowedSpaceIdsStruct }>()
);
