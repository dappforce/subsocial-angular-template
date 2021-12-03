import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as SpaceActions from './space.actions';
import * as ContentActions from '../content/content.actions';
import * as LoaderActions from '../loader/loader.actions';
import { filter, map, switchMap } from 'rxjs/operators';
import { SpaceService } from '../../space/services/space.service';
import { from } from 'rxjs';
import { Content } from '../../core/types/content.type';
import { SpaceStruct } from '@subsocial/api/flat-subsocial/flatteners';

@Injectable()
export class SpaceEffects {
  constructor(private action$: Actions, private spaceService: SpaceService) {}

  loadSpaces$ = createEffect(() =>
    this.action$.pipe(
      ofType(SpaceActions.getSpacesByIds),
      switchMap(({ payload }) =>
        from(
          this.spaceService.getFlatSpacesById(payload.ids, payload.type)
        ).pipe(
          switchMap((spaceData) => [
            ContentActions.upsertContents({ payload: spaceData.contents }),
            LoaderActions.setLoader({ isLoading: false }),
            SpaceActions.upsertSpaces({
              payload: spaceData.structs as Array<SpaceStruct>,
            }),
            SpaceActions.loadSpaceSuccess(),
          ])
        )
      )
    )
  );

  loadSpace$ = createEffect(() =>
    this.action$.pipe(
      ofType(SpaceActions.loadSpaceById),
      switchMap(({ id }) =>
        from(this.spaceService.getSpaceById(id)).pipe(
          filter((space) => space !== undefined),
          switchMap((space) => [
            SpaceActions.upsertSpace({ payload: space!.struct as SpaceStruct }),
            ContentActions.upsertContent({
              payload: space!.content as Content,
            }),
            SpaceActions.loadSpaceSuccess(),
          ])
        )
      )
    )
  );
}
