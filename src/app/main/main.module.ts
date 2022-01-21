import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { MainRoutingModule } from './main-routing.module';
import { SharedModule } from '../shared/shared.module';
import { SpaceModule } from '../space/space.module';
import { PostModule } from '../post/post.module';
import { FeedComponent } from './feed/feed.component';
import { ContentModule } from '../ui-lib/content/content.module';
import { PostUiModule } from '../ui-lib/post-ui/post-ui.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { TranslocoModule } from '@ngneat/transloco';

@NgModule({
  declarations: [MainComponent, FeedComponent],
  exports: [MainComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule,
    SpaceModule,
    PostModule,
    ContentModule,
    PostUiModule,
    InfiniteScrollModule,
    TranslocoModule,
  ],
})
export class MainModule {}
