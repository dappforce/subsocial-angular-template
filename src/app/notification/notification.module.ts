import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationPageComponent } from './notification-page/notification-page.component';
import { SharedModule } from '../shared/shared.module';
import { TextModule } from '../components/text/text.module';
import { PostUiModule } from '../components/post-ui/post-ui.module';
import { ContentModule } from '../components/content/content.module';
import { NotificationRoutingModule } from './notification-routing.module';
import { NotificationItemComponent } from './notification-item/notification-item.component';
import { ContainersModule } from '../components/containers/containers.module';
import { AvatarModule } from '../components/avatar/avatar.module';
import { PipesModule } from '../shared/pipes/pipes.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { I18NextModule } from 'angular-i18next';

@NgModule({
  declarations: [NotificationPageComponent, NotificationItemComponent],
  imports: [
    CommonModule,
    SharedModule,
    TextModule,
    PostUiModule,
    ContentModule,
    NotificationRoutingModule,
    ContainersModule,
    AvatarModule,
    PipesModule,
    InfiniteScrollModule,
    I18NextModule,
  ],
})
export class NotificationModule {}
