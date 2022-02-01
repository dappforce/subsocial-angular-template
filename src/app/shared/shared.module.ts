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
import { MatDialogModule } from '@angular/material/dialog';
import { LinkIconsComponent } from './components/link-icons/link-icons.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MatSnackBarModule } from '@angular/material/snack-bar';
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
import { HttpClientModule } from '@angular/common/http';
import { AdblockDetectComponent } from './components/adblock-detect/adblock-detect.component';
import { TranslocoModule } from '@ngneat/transloco';
import { DirectivesModule } from './directives/directives.module';
import { HeaderMenuButtonComponent } from './components/header-menu-button/header-menu-button.component';

@NgModule({
  declarations: [
    VoteUserListItemComponent,
    HeaderComponent,
    TabsComponent,
    LinkIconsComponent,
    SpinnerComponent,
    VoteUserListComponent,
    SimpleSnackBarComponent,
    AdblockDetectComponent,
    HeaderMenuButtonComponent,
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
    LinkIconsComponent,
    MatTooltipModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    ReactiveFormsModule,
    SpinnerComponent,
    MatSnackBarModule,
    VoteUserListComponent,
    AdblockDetectComponent,
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
    MatTooltipModule,
    MatRippleModule,
    MatProgressSpinnerModule,
    InfiniteScrollModule,
    MatSnackBarModule,
    ContainersModule,
    MenuModule,
    AddressModule,
    ProfileModule,
    AvatarModule,
    BalanceModule,
    TextModule,
    PipesModule,
    ButtonsModule,
    HttpClientModule,
    TranslocoModule,
    DirectivesModule,
  ],
})
export class SharedModule {}
