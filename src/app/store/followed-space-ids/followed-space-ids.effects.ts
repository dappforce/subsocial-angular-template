import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as FollowedSpaceIdsActions from '../followed-space-ids/followed-space-ids.actions';
import { map, switchMap } from 'rxjs/operators';
import { from } from 'rxjs';
import { FollowerService } from '../../shared/services/follower.service';

@Injectable()
export class FollowedSpaceIdsEffects {
  constructor(
    private action$: Actions,
    private followerService: FollowerService
  ) {}

  loadFollowedSpaceIds$ = createEffect(() =>
    this.action$.pipe(
      ofType(FollowedSpaceIdsActions.getFollowedSpaceIds),
      switchMap(({ payload }) =>
        from(this.followerService.loadFollowedSpaceIds(payload.address)).pipe(
          map((ids) =>
            FollowedSpaceIdsActions.upsertFollowedSpaceIds({
              payload: ids,
            })
          )
        )
      )
    )
  );
}
