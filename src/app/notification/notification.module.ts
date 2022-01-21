import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationPageComponent } from './notification-page/notification-page.component';
import { SharedModule } from '../shared/shared.module';
import { TextModule } from '../ui-lib/text/text.module';
import { PostUiModule } from '../ui-lib/post-ui/post-ui.module';
import { ContentModule } from '../ui-lib/content/content.module';
import { NotificationRoutingModule } from './notification-routing.module';
import { NotificationItemComponent } from './notification-item/notification-item.component';
import { ContainersModule } from '../ui-lib/containers/containers.module';
import { AvatarModule } from '../ui-lib/avatar/avatar.module';
import { PipesModule } from '../shared/pipes/pipes.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { TranslocoModule } from '@ngneat/transloco';

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
    TranslocoModule,
  ],
})
export class NotificationModule {}
