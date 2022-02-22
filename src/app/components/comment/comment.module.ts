import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentInputComponent } from './comment-input/comment-input.component';
import { CommentsComponent } from './comments/comments.component';
import { ButtonsModule } from '../buttons/buttons.module';
import { AvatarModule } from '../avatar/avatar.module';
import { TextModule } from '../text/text.module';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { AddressModule } from '../address/address.module';
import { PipesModule } from '../../shared/pipes/pipes.module';
import { ContainersModule } from '../containers/containers.module';
import { ActionPanelModule } from '../action-panel/action-panel.module';
import { MarkdownModule } from 'ngx-markdown';
import { InputModule } from '../input/input.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuModule } from '../menu/menu.module';
import { ShowCommentsButtonComponent } from './show-comments-button/show-comments-button.component';
import { CommentItemComponent } from './comment-item/comment-item.component';
import { CommentListComponent } from './comment-list/comment-list.component';
import { ContentModule } from '../content/content.module';
import { I18NextModule } from 'angular-i18next';

@NgModule({
  declarations: [
    CommentInputComponent,
    CommentsComponent,
    ShowCommentsButtonComponent,
    CommentItemComponent,
    CommentListComponent,
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
    MarkdownModule,
    InputModule,
    FormsModule,
    ReactiveFormsModule,
    MenuModule,
    ContentModule,
    I18NextModule,
  ],
  exports: [
    CommentInputComponent,
    CommentsComponent,
    CommentItemComponent,
    CommentListComponent,
  ],
})
export class CommentModule {}
