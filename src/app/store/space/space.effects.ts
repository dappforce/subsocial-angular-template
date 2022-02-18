import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as SpaceActions from './space.actions';
import { filter, switchMap } from 'rxjs/operators';
import { SpaceService } from '../../space/services/space.service';
import { from } from 'rxjs';

@Injectable()
export class SpaceEffects {
  constructor(private action$: Actions, private spaceService: SpaceService) {}

  loadSpaces$ = createEffect(() =>
    this.action$.pipe(
      ofType(SpaceActions.loadSpacesByIds),
      switchMap(({ payload }) =>
        from(this.spaceService.loadSpacesByIds(payload.ids, payload.type)).pipe(
          switchMap((spaceData) => [
            SpaceActions.upsertSpaces({
              payload: spaceData,
            }),
          ])
        )
      )
    )
  );

  loadSpace$ = createEffect(() =>
    this.action$.pipe(
      ofType(SpaceActions.loadSpaceById),
      switchMap(({ id }) =>
        from(this.spaceService.loadSpaceById(id)).pipe(
          filter((space) => space !== undefined),
          switchMap((space) => [SpaceActions.upsertSpace({ payload: space })])
        )
      )
    )
  );
}
