import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AccountService } from '../../shared/services/account.service';
import * as ProfileAction from './profile.actions';
import * as ContentAction from '../content/content.actions';
import * as LoaderAction from '../loader/loader.actions';
import * as MyAccountAction from '../my-account/my-account.actions';
import { concatMap, filter, switchMap, tap } from 'rxjs/operators';
import { from } from 'rxjs';
import { Content } from 'src/app/core/types/content.type';
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
      ofType(ProfileAction.loadProfile),
      switchMap(({ id }) =>
        from(this.accountService.loadProfile(id)).pipe(
          filter((profileData) => !!profileData),
          switchMap((profileData) => [
            ProfileAction.upsertProfile({
              payload: profileData!.struct,
            }),
            ContentAction.upsertContent({
              payload: profileData!.content as Content,
            }),
            ProfileAction.saveProfilesSuccess(),
          ])
        )
      )
    )
  );

  loadProfiles$ = createEffect(() =>
    this.action$.pipe(
      ofType(ProfileAction.loadProfiles),
      switchMap(({ payload }) =>
        from(this.profileService.getProfilesByIds(payload.ids)).pipe(
          filter((profileData) => !!profileData),
          switchMap((profileData) => [
            ContentAction.upsertContents({
              payload: profileData!.contents,
            }),
            LoaderAction.setLoader({ isLoading: false }),
            ProfileAction.upsertProfiles({
              payload: profileData!.structs,
            }),
            ProfileAction.saveProfilesSuccess(),
          ])
        )
      )
    )
  );

  loadMyProfiles$ = createEffect(() =>
    this.action$.pipe(
      ofType(ProfileAction.loadMyProfile),
      switchMap(({ id }) =>
        from(this.accountService.loadProfile(id)).pipe(
          filter((profileData) => !!profileData),
          concatMap((profileData) => {
            if (profileData?.content) {
              return [
                MyAccountAction.setMyAccount({
                  payload: this.accountService.getMyAccountData(
                    profileData!.struct
                  ),
                }),
                ProfileAction.upsertProfile({
                  payload: profileData!.struct,
                }),
                ContentAction.upsertContent({
                  payload: profileData!.content as Content,
                }),
                ProfileAction.saveProfilesSuccess(),
              ];
            } else {
              return [
                MyAccountAction.setMyAccount({
                  payload: this.accountService.getMyAccountData(
                    profileData!.struct
                  ),
                }),
                ProfileAction.upsertProfile({
                  payload: profileData!.struct,
                }),
                ProfileAction.saveProfilesSuccess(),
              ];
            }
          })
        )
      )
    )
  );
}
