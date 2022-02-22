import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';
import { PostListComponent } from './post-list/post-list.component';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { PostComponent } from './post/post.component';
import { MarkdownModule } from 'ngx-markdown';
import { EditPostComponent } from './edit-post/edit-post.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { TextModule } from '../components/text/text.module';
import { ButtonsModule } from '../components/buttons/buttons.module';
import { InputModule } from '../components/input/input.module';
import { SpaceUiModule } from '../components/space-ui/space-ui.module';
import { PipesModule } from '../shared/pipes/pipes.module';
import { PostUiModule } from '../components/post-ui/post-ui.module';
import { ContentModule } from '../components/content/content.module';
import { CommentModule } from '../components/comment/comment.module';
import { ActionPanelModule } from '../components/action-panel/action-panel.module';
import { ContainersModule } from '../components/containers/containers.module';
import { MenuModule } from '../components/menu/menu.module';
import { I18NextModule } from 'angular-i18next';

@NgModule({
  declarations: [PostListComponent, PostComponent, EditPostComponent],
  exports: [PostListComponent],
  imports: [
    CommonModule,
    PostRoutingModule,
    SharedModule,
    HttpClientModule,
    InfiniteScrollModule,
    MarkdownModule.forRoot(),
    TextModule,
    ButtonsModule,
    InputModule,
    SpaceUiModule,
    PipesModule,
    PostUiModule,
    ContentModule,
    CommentModule,
    ActionPanelModule,
    ContainersModule,
    MenuModule,
    I18NextModule,
  ],
})
export class PostModule {}
