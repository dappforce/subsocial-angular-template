import {
  componentWrapperDecorator,
  Meta,
  moduleMetadata,
  Story,
} from '@storybook/angular';

import {
  IconRegistryProviders,
  PostTemplate,
  SbDeviceRegistry,
  SbRouterModule,
  SbStoreModules,
  SharedPostTemplate,
} from '../../../core/constants/storybook.const';
import { HttpClientModule } from '@angular/common/http';
import { I18NextModule } from 'angular-i18next';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PostUiModule } from '../post-ui.module';
import { SharedPostItemComponent } from './shared-post-item.component';
import { I18N_PROVIDERS } from '../../../locale/i18next.config';

export default {
  title: 'Post/Shared Post Item',
  component: SharedPostItemComponent,
  decorators: [
    moduleMetadata({
      imports: [
        HttpClientModule,
        PostUiModule,
        I18NextModule.forRoot(),
        MatIconModule,
        BrowserAnimationsModule,
        SbRouterModule,
        SbStoreModules,
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
    include: ['postItemData', 'sharedPostItemData', 'isSharedPostHidden'],
  },
};

const Template: Story<SharedPostItemComponent> = (
  args: SharedPostItemComponent
) => ({
  component: SharedPostItemComponent,
  props: args,
});

export const SharedPostItem: Story<SharedPostItemComponent> = Template.bind({});
SharedPostItem.args = {
  postItemData: SharedPostTemplate,
  sharedPostItemData: PostTemplate,
};

SharedPostItem.parameters = params;

export const HiddenSharedPostItem: Story<SharedPostItemComponent> =
  Template.bind({});
HiddenSharedPostItem.args = {
  postItemData: SharedPostTemplate,
  isSharedPostHidden: true,
};

HiddenSharedPostItem.parameters = params;
