import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentInputComponent } from './comment-input/comment-input.component';
import { CommentsComponent } from './comments/comments.component';
import { CommentMessageComponent } from './comment-message/comment-message.component';
import { ReplyCommentsComponent } from './reply-comments/reply-comments.component';
import { ButtonsModule } from '../buttons/buttons.module';
import { AvatarModule } from '../avatar/avatar.module';
import { TextModule } from '../text/text.module';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { AddressModule } from '../address/address.module';
import { PipesModule } from '../../shared/pipes/pipes.module';
import { ContainersModule } from '../containers/containers.module';
import { ActionPanelModule } from '../action-panel/action-panel.module';

@NgModule({
  declarations: [
    CommentInputComponent,
    CommentsComponent,
    CommentMessageComponent,
    ReplyCommentsComponent,
  ],
  imports: [
    CommonModule,
    ButtonsModule,
    AvatarModule,
    TextModule,
    SharedModule,
    AddressModule,
    RouterModule,
    PipesModule,
    ContainersModule,
    ActionPanelModule,
  ],
  exports: [
    CommentInputComponent,
    CommentsComponent,
    CommentMessageComponent,
    ReplyCommentsComponent,
  ],
})
export class CommentModule {}
