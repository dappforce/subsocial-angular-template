import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconButtonComponent } from './icon-button/icon-button.component';
import { CloseButtonComponent } from './close-button/close-button.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FollowButtonComponent } from './follow-button/follow-button.component';
import { OptionButtonComponent } from './option-button/option-button.component';
import { MatMenuModule } from '@angular/material/menu';
import { SendTipsButtonComponent } from './send-tips-button/send-tips-button.component';
import { ReplyButtonComponent } from './reply-button/reply-button.component';
import { UpvoteButtonComponent } from './upvote-button/upvote-button.component';
import { CommentButtonComponent } from './comment-button/comment-button.component';
import { PipesModule } from '../../shared/pipes/pipes.module';
import { DownvoteButtonComponent } from './downvote-button/downvote-button.component';
import { SharedButtonComponent } from './shared-button/shared-button.component';
import { SendButtonComponent } from './send-button/send-button.component';
import { ProfileButtonComponent } from './profile-button/profile-button.component';
import { SendTokensButtonComponent } from './send-tokens-button/send-tokens-button.component';
import { WritePostButtonComponent } from './write-post-button/write-post-button.component';
import { SignOutButtonComponent } from './sign-out-button/sign-out-button.component';
import { EditButtonComponent } from './edit-button/edit-button.component';
import { RouterModule } from '@angular/router';
import { QrButtonComponent } from './qr-button/qr-button.component';
import { ContainersModule } from '../containers/containers.module';
import { AvatarModule } from '../avatar/avatar.module';
import { AddressModule } from '../address/address.module';
import { BalanceModule } from '../balance/balance.module';

const components = [
  QrButtonComponent,
  EditButtonComponent,
  SendTokensButtonComponent,
  WritePostButtonComponent,
  SignOutButtonComponent,
  ProfileButtonComponent,
  IconButtonComponent,
  CloseButtonComponent,
  FollowButtonComponent,
  OptionButtonComponent,
  SendTipsButtonComponent,
  ReplyButtonComponent,
  UpvoteButtonComponent,
  DownvoteButtonComponent,
  CommentButtonComponent,
  SharedButtonComponent,
  SendButtonComponent,
];

@NgModule({
  declarations: [...components],
  exports: [...components],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    PipesModule,
    RouterModule,
    ContainersModule,
    AvatarModule,
    BalanceModule,
  ],
})
export class ButtonsModule {}
