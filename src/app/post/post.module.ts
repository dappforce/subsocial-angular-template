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
import { TextModule } from '../ui-lib/text/text.module';
import { ButtonsModule } from '../ui-lib/buttons/buttons.module';
import { InputModule } from '../ui-lib/input/input.module';
import { SpaceUiModule } from '../ui-lib/space-ui/space-ui.module';
import { PipesModule } from '../shared/pipes/pipes.module';
import { PostUiModule } from '../ui-lib/post-ui/post-ui.module';
import { ContentModule } from '../ui-lib/content/content.module';
import { CommentModule } from '../ui-lib/comment/comment.module';
import { ActionPanelModule } from '../ui-lib/action-panel/action-panel.module';

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
  ],
})
export class PostModule {}
