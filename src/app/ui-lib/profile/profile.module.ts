import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountListItemComponent } from './account-list-item/account-list-item.component';
import { ContainersModule } from '../containers/containers.module';
import { AddressModule } from '../address/address.module';
import { AvatarModule } from '../avatar/avatar.module';
import { BalanceModule } from '../balance/balance.module';
import { TextModule } from '../text/text.module';
import { MatRippleModule } from '@angular/material/core';
import { PipesModule } from '../../shared/pipes/pipes.module';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [AccountListItemComponent, ProfileInfoComponent],
  exports: [AccountListItemComponent, ProfileInfoComponent],
  imports: [
    CommonModule,
    ContainersModule,
    AddressModule,
    AvatarModule,
    BalanceModule,
    TextModule,
    MatRippleModule,
    PipesModule,
    MatDialogModule,
  ],
})
export class ProfileModule {}
