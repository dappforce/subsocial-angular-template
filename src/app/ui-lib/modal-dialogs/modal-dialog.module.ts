import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountSidenavComponent } from './account-sidenav/account-sidenav.component';
import { ConnectionsModalDialogComponent } from './connections-modal-dialog/connections-modal-dialog.component';
import { FollowersModalDialogComponent } from './followers-modal-dialog/followers-modal-dialog.component';
import { QrModalDialogComponent } from './qr-modal-dialog/qr-modal-dialog.component';
import { SharePostModalDialogComponent } from './share-post-modal-dialog/share-post-modal-dialog.component';
import { SignInModalDialogComponent } from './sign-in-modal-dialog/sign-in-modal-dialog.component';
import { VoteModalDialogComponent } from './vote-modal-dialog/vote-modal-dialog.component';
import { ButtonsModule } from '../buttons/buttons.module';
import { SharedModule } from '../../shared/shared.module';
import { ContainersModule } from '../containers/containers.module';
import { PipesModule } from '../../shared/pipes/pipes.module';
import { AvatarModule } from '../avatar/avatar.module';
import { BalanceModule } from '../balance/balance.module';
import { AddressModule } from '../address/address.module';
import { ProfileModule } from '../profile/profile.module';
import { MenuModule } from '../menu/menu.module';
import { QRCodeModule } from 'angularx-qrcode';
import { MatSidenavModule } from '@angular/material/sidenav';
import { PostUiModule } from '../post-ui/post-ui.module';
import { SpaceUiModule } from '../space-ui/space-ui.module';
import { InputModule } from '../input/input.module';
import { AdblockConflictModalDialogComponent } from './adblock-conflict-modal-dialog/adblock-conflict-modal-dialog.component';
import { TranslocoModule } from '@ngneat/transloco';
import { SendTipsModalDialogComponent } from './send-tips-modal-dialog/send-tips-modal-dialog.component';
import { GetTokensModalDialogComponent } from './get-tokens-modal-dialog/get-tokens-modal-dialog.component';
import { TextModule } from "../text/text.module";

@NgModule({
  declarations: [
    AccountSidenavComponent,
    ConnectionsModalDialogComponent,
    FollowersModalDialogComponent,
    QrModalDialogComponent,
    SharePostModalDialogComponent,
    SignInModalDialogComponent,
    VoteModalDialogComponent,
    AdblockConflictModalDialogComponent,
    SendTipsModalDialogComponent,
    GetTokensModalDialogComponent,
  ],
  imports: [
    CommonModule,
    ButtonsModule,
    SharedModule,
    ContainersModule,
    PipesModule,
    AvatarModule,
    BalanceModule,
    AddressModule,
    ProfileModule,
    MenuModule,
    QRCodeModule,
    MatSidenavModule,
    PostUiModule,
    SpaceUiModule,
    InputModule,
    TranslocoModule,
    TextModule
  ],
  exports: [
    AccountSidenavComponent,
    ConnectionsModalDialogComponent,
    FollowersModalDialogComponent,
    QrModalDialogComponent,
    SharePostModalDialogComponent,
    SignInModalDialogComponent,
    VoteModalDialogComponent,
  ],
})
export class ModalDialogModule {}
