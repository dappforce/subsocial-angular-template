import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationPageComponent } from './notification-page/notification-page.component';
import { SharedModule } from '../shared/shared.module';
import { TextModule } from '../ui-lib/text/text.module';
import { PostUiModule } from '../ui-lib/post-ui/post-ui.module';
import { ContentModule } from '../ui-lib/content/content.module';
import { NotificationRoutingModule } from './notification-routing.module';

@NgModule({
  declarations: [NotificationPageComponent],
  imports: [
    CommonModule,
    SharedModule,
    TextModule,
    PostUiModule,
    ContentModule,
    NotificationRoutingModule,
  ],
})
export class NotificationModule {}
