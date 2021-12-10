import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as FollowedAccountIdsActions from '../followed-account-ids/followed-account-ids.actions';
import { map, switchMap } from 'rxjs/operators';
import { from } from 'rxjs';
import { FollowerService } from '../../shared/services/follower.service';

@Injectable()
export class FollowedAccountIdsEffects {
  constructor(
    private action$: Actions,
    private followerService: FollowerService
  ) {}

  loadFollowedAccountIds$ = createEffect(() =>
    this.action$.pipe(
      ofType(FollowedAccountIdsActions.getFollowedAccountIds),
      switchMap(({ payload }) =>
        from(this.followerService.loadFollowedAccountIds(payload.address)).pipe(
          map((ids) =>
            FollowedAccountIdsActions.upsertFollowedAccountIds({
              payload: ids,
            })
          )
        )
      )
    )
  );
}
