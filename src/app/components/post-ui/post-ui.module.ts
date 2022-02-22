import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostInfoComponent } from './post-info/post-info.component';
import { PostItemComponent } from './post-item/post-item.component';
import { SharedPostItemComponent } from './shared-post-item/shared-post-item.component';
import { TextModule } from '../text/text.module';
import { ButtonsModule } from '../buttons/buttons.module';
import { AvatarModule } from '../avatar/avatar.module';
import { RouterModule } from '@angular/router';
import { PipesModule } from '../../shared/pipes/pipes.module';
import { ContainersModule } from '../containers/containers.module';
import { ContentModule } from '../content/content.module';
import { CommentModule } from '../comment/comment.module';
import { ActionPanelModule } from '../action-panel/action-panel.module';
import { MenuModule } from '../menu/menu.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [PostInfoComponent, PostItemComponent, SharedPostItemComponent],
  imports: [
    CommonModule,
    TextModule,
    ButtonsModule,
    AvatarModule,
    RouterModule,
    PipesModule,
    ContainersModule,
    ContentModule,
    CommentModule,
    ActionPanelModule,
    MenuModule,
    SharedModule,
  ],
  exports: [PostInfoComponent, PostItemComponent, SharedPostItemComponent],
})
export class PostUiModule {}
