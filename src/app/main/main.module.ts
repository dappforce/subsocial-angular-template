import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { MainRoutingModule } from './main-routing.module';
import { SharedModule } from '../shared/shared.module';
import { SpaceModule } from '../space/space.module';
import { PostModule } from '../post/post.module';
import { FeedComponent } from './feed/feed.component';
import { ContentModule } from '../components/content/content.module';
import { PostUiModule } from '../components/post-ui/post-ui.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { I18NextModule } from 'angular-i18next';

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
    I18NextModule,
  ],
})
export class MainModule {}
