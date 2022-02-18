import { PostItemComponent } from '../../post-ui/post-item/post-item.component';
import {
  componentWrapperDecorator,
  Meta,
  moduleMetadata,
  Story,
} from '@storybook/angular';
import { HttpClientModule } from '@angular/common/http';
import { PostUiModule } from '../../post-ui/post-ui.module';
import { I18NextModule } from 'angular-i18next';
import { MatIconModule } from '@angular/material/icon';
import {
  IconRegistryProviders,
  PostTemplate,
  SbDeviceRegistry,
  SbRouterModule,
  SbStoreModules,
  SbTemplateId,
} from '../../../core/constants/storybook.const';
import { ProfileModule } from '../profile.module';
import { AccountListItemComponent } from './account-list-item.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { I18N_PROVIDERS } from '../../../locale/i18next.config';

export default {
  title: 'Profile/Account List Item',
  component: AccountListItemComponent,
  decorators: [
    moduleMetadata({
      imports: [
        MatSnackBarModule,
        HttpClientModule,
        I18NextModule.forRoot(),
        MatIconModule,
        SbRouterModule,
        SbStoreModules,
        ProfileModule,
      ],
      declarations: [],
      providers: [
        ...IconRegistryProviders,
        ...SbDeviceRegistry,
        ...I18N_PROVIDERS,
      ],
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
    include: ['accountData', 'tagCtrl'],
  },
};

const Template: Story<AccountListItemComponent> = (
  args: AccountListItemComponent
) => ({
  component: AccountListItemComponent,
  props: args,
});

export const AccountListItem: Story<AccountListItemComponent> = Template.bind(
  {}
);
AccountListItem.args = {
  accountData: {
    id: SbTemplateId,
    balance: '1123.2000',
    name: 'Subsocial user',
    avatar: '',
  },
};

AccountListItem.parameters = params;
