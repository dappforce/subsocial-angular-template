import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatIconModule } from '@angular/material/icon';
import { VoteUserListItemComponent } from './components/vote-user-list-item/vote-user-list-item.component';
import { HeaderComponent } from './components/header/header.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { TabsComponent } from './components/tabs/tabs.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { VoteModalDialogComponent } from './modal-dialogs/vote-modal-dialog/vote-modal-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AccountSidenavComponent } from './modal-dialogs/account-sidenav/account-sidenav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LinkIconsComponent } from './components/link-icons/link-icons.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRippleModule } from '@angular/material/core';
import { FollowersModalDialogComponent } from './modal-dialogs/followers-modal-dialog/followers-modal-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ConnectionsModalDialogComponent } from './modal-dialogs/connections-modal-dialog/connections-modal-dialog.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { QrModalDialogComponent } from './modal-dialogs/qr-modal-dialog/qr-modal-dialog.component';
import { QRCodeModule } from 'angularx-qrcode';
import { SignInModalDialogComponent } from './modal-dialogs/sign-in-modal-dialog/sign-in-modal-dialog.component';
import { VoteUserListComponent } from './components/vote-user-list/vote-user-list.component';
import { ContainersModule } from '../ui-lib/containers/containers.module';
import { ButtonsModule } from '../ui-lib/buttons/buttons.module';
import { MenuModule } from '../ui-lib/menu/menu.module';
import { AddressModule } from '../ui-lib/address/address.module';
import { ProfileModule } from '../ui-lib/profile/profile.module';
import { AvatarModule } from '../ui-lib/avatar/avatar.module';
import { BalanceModule } from '../ui-lib/balance/balance.module';
import { TextModule } from '../ui-lib/text/text.module';
import { PipesModule } from './pipes/pipes.module';
import { SimpleSnackBarComponent } from './components/simple-snack-bar/simple-snack-bar.component';

@NgModule({
  declarations: [
    VoteUserListItemComponent,
    HeaderComponent,
    TabsComponent,
    VoteModalDialogComponent,
    AccountSidenavComponent,
    LinkIconsComponent,
    FollowersModalDialogComponent,
    SpinnerComponent,
    ConnectionsModalDialogComponent,
    QrModalDialogComponent,
    SignInModalDialogComponent,
    VoteUserListComponent,
    SimpleSnackBarComponent,
  ],
  exports: [
    VoteUserListItemComponent,
    HeaderComponent,
    MatButtonModule,
    ClipboardModule,
    MatIconModule,
    MatTabsModule,
    MatCardModule,
    MatDividerModule,
    TabsComponent,
    MatMenuModule,
    AccountSidenavComponent,
    LinkIconsComponent,
    MatTooltipModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    ReactiveFormsModule,
    SpinnerComponent,
    MatSnackBarModule,
    QRCodeModule,
  ],
  imports: [
    CommonModule,
    ClipboardModule,
    MatIconModule,
    MatTabsModule,
    MatCardModule,
    MatButtonModule,
    RouterModule,
    MatDividerModule,
    MatDialogModule,
    MatSidenavModule,
    MatTooltipModule,
    MatRippleModule,
    MatProgressSpinnerModule,
    InfiniteScrollModule,
    MatSnackBarModule,
    QRCodeModule,
    ContainersModule,
    MenuModule,
    AddressModule,
    ProfileModule,
    AvatarModule,
    BalanceModule,
    TextModule,
    PipesModule,
    ButtonsModule,
  ],
})
export class SharedModule {}
