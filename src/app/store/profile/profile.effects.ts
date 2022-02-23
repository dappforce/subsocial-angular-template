import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AccountService } from '../../shared/services/account.service';
import * as ProfileAction from './profile.actions';
import * as MyAccountAction from '../my-account/my-account.actions';
import { filter, switchMap } from 'rxjs/operators';
import { from } from 'rxjs';
import { ProfileService } from '../../account/services/profile.service';

@Injectable()
export class ProfileEffects {
  constructor(
    private action$: Actions,
    private accountService: AccountService,
    private profileService: ProfileService
  ) {}

  loadProfile$ = createEffect(() =>
    this.action$.pipe(
      ofType(ProfileAction.loadProfileById),
      switchMap(({ id }) =>
        from(this.profileService.fetchProfileById(id)).pipe(
          filter((profile) => !!profile),
          switchMap((profile) => [
            ProfileAction.upsertProfile({
              payload: profile,
            }),
          ])
        )
      )
    )
  );

  loadProfiles$ = createEffect(() =>
    this.action$.pipe(
      ofType(ProfileAction.loadProfilesByIds),
      switchMap(({ payload }) =>
        from(this.profileService.fetchProfilesByIds(payload.ids)).pipe(
          filter((profiles) => !!profiles),
          switchMap((profiles) => [
            ProfileAction.upsertProfiles({
              payload: profiles,
            }),
          ])
        )
      )
    )
  );

  loadMyProfiles$ = createEffect(() =>
    this.action$.pipe(
      ofType(ProfileAction.loadMyProfile),
      switchMap(({ payload }) =>
        from(this.profileService.fetchProfileById(payload.id)).pipe(
          filter((profile) => !!profile),
          switchMap((profile) => [
            MyAccountAction.setMyAccount({
              payload: this.accountService.getMyAccountData(payload),
            }),
            ProfileAction.upsertProfile({
              payload: profile,
            }),
          ])
        )
      )
    )
  );
}
