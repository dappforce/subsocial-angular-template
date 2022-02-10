import {
  componentWrapperDecorator,
  Meta,
  moduleMetadata,
  Story,
} from '@storybook/angular';
import { HttpClientModule } from '@angular/common/http';
import { TranslocoRootModule } from '../../../transloco-root.module';
import { MatIconModule } from '@angular/material/icon';
import {
  IconRegistryProviders,
  SbDeviceRegistry,
  SbRouterModule,
  SbStoreModules,
} from '../../../core/constants/storybook.const';
import { ProfileModule } from '../profile.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ProfileInfoComponent } from './profile-info.component';
import { TranslocoMessageFormatModule } from '@ngneat/transloco-messageformat';

export default {
  title: 'Profile/Profile Info',
  component: ProfileInfoComponent,
  decorators: [
    moduleMetadata({
      imports: [
        MatSnackBarModule,
        HttpClientModule,
        TranslocoRootModule,
        MatIconModule,
        SbRouterModule,
        SbStoreModules,
        ProfileModule,
        TranslocoMessageFormatModule.forRoot(),
      ],
      declarations: [],
      providers: [...IconRegistryProviders, ...SbDeviceRegistry],
    }),
    componentWrapperDecorator((story) => {
      return `
      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap" rel="stylesheet">
      <div class="sb-container">
            ${story}
        </div>`;
    }),
  ],
} as Meta;

const params = {
  controls: {
    include: [
      'avatarSrc',
      'profileName',
      'type',
      'followingCount',
      'followersCount',
      'profileId',
      'link',
      'address',
    ],
  },
};

const Template: Story<ProfileInfoComponent> = (args: ProfileInfoComponent) => ({
  component: ProfileInfoComponent,
  props: args,
});

export const ProfileInfo: Story<ProfileInfoComponent> = Template.bind({});
ProfileInfo.args = {
  avatarSrc: '',
  profileName: 'Subsocial User',
  followersCount: 10,
  followingCount: 12,
};

ProfileInfo.parameters = params;
