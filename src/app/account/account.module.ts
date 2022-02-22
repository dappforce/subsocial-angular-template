import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { AccountComponent } from './account/account.component';
import { SharedModule } from '../shared/shared.module';
import { PostModule } from '../post/post.module';
import { SpaceModule } from '../space/space.module';
import { AddressModule } from '../components/address/address.module';
import { BalanceModule } from '../components/balance/balance.module';
import { ButtonsModule } from '../components/buttons/buttons.module';
import { TextModule } from '../components/text/text.module';
import { ContainersModule } from '../components/containers/containers.module';
import { ContentModule } from '../components/content/content.module';
import { ProfileModule } from '../components/profile/profile.module';
import { AccountRoutingModule } from './account-routing.module';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { InputModule } from '../components/input/input.module';
import { I18NextModule } from 'angular-i18next';
import { MenuModule } from '../components/menu/menu.module';
import { DirectivesModule } from '../shared/directives/directives.module';

@NgModule({
  declarations: [ProfileComponent, AccountComponent, EditProfileComponent],
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
    InputModule,
    MenuModule,
    DirectivesModule,
    I18NextModule,
  ],
})
export class AccountModule {}
