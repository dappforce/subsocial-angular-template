import { APP_INITIALIZER, NgModule } from '@angular/core';
import {
  BrowserModule,
  BrowserTransferStateModule,
} from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { IconRegistryService } from './shared/services/icon-registry.service';
import { CommonModule } from '@angular/common';
import { SpaceModule } from './space/space.module';
import { ErrorStateMatcher } from '@angular/material/core';
import { AppErrorStateMatcher } from './core/errors/error-matcher';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { SpaceEffects } from './store/space/space.effects';
import { appReducers } from './store/state';
import { SubsocialApiService } from './shared/services/subsocial-api.service';
import { PostEffects } from './store/post/post.effects';
import { ReplyIdEffects } from './store/reply-id/reply-id.effects';
import { ProfileEffects } from './store/profile/profile.effects';
import { RouterModule } from '@angular/router';
import { MyPostReactionsEffects } from './store/my-post-reactions/my-post-reactions.effects';
import { PostModule } from './post/post.module';
import { FollowedSpaceIdsEffects } from './store/followed-space-ids/followed-space-ids.effects';
import { FollowedAccountIdsEffects } from './store/followed-account-ids/followed-account-ids.effects';
import { MenuModule } from './components/menu/menu.module';
import { ModalDialogModule } from './components/modal-dialogs/modal-dialog.module';
import { I18NextModule } from 'angular-i18next';
import { I18N_PROVIDERS } from './locale/i18next.config';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    PostModule,
    SpaceModule,
    BrowserAnimationsModule,
    BrowserTransferStateModule,
    RouterModule,
    StoreModule.forRoot(appReducers, {}),
    StoreDevtoolsModule.instrument({
      maxAge: 40,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([
      SpaceEffects,
      PostEffects,
      ReplyIdEffects,
      ProfileEffects,
      MyPostReactionsEffects,
      FollowedSpaceIdsEffects,
      FollowedAccountIdsEffects,
    ]),
    SharedModule,
    MenuModule,
    ModalDialogModule,
    I18NextModule.forRoot(),
  ],
  providers: [
    IconRegistryService,
    SubsocialApiService,
    {
      provide: APP_INITIALIZER,
      useFactory: registryIcons,
      deps: [IconRegistryService],
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initApi,
      deps: [SubsocialApiService],
      multi: true,
    },
    { provide: ErrorStateMatcher, useClass: AppErrorStateMatcher },
    ...I18N_PROVIDERS,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

export function registryIcons(service: IconRegistryService) {
  return () => service.init();
}

export function initApi(service: SubsocialApiService) {
  return () => service.initSubsocialApi();
}
