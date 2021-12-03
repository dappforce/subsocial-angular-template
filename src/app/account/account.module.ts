import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { AccountComponent } from './account/account.component';
import { SharedModule } from '../shared/shared.module';
import { PostModule } from '../post/post.module';
import { SpaceModule } from '../space/space.module';
import { AddressModule } from '../ui-lib/address/address.module';
import { BalanceModule } from '../ui-lib/balance/balance.module';
import { ButtonsModule } from '../ui-lib/buttons/buttons.module';
import { TextModule } from '../ui-lib/text/text.module';
import { ContainersModule } from '../ui-lib/containers/containers.module';
import { ContentModule } from '../ui-lib/content/content.module';
import { ProfileModule } from '../ui-lib/profile/profile.module';
import { AccountRoutingModule } from './account-routing.module';

@NgModule({
  declarations: [ProfileComponent, AccountComponent],
  imports: [
    CommonModule,
    PostModule,
    SpaceModule,
    AddressModule,
    BalanceModule,
    ButtonsModule,
    TextModule,
    ContainersModule,
    ContentModule,
    SharedModule,
    ProfileModule,
    AccountRoutingModule,
  ],
})
export class AccountModule {}
