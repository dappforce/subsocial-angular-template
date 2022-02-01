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
  PostTemplate,
  SbDeviceRegistry,
  SbRouterModule,
  SbStoreModules,
  SbTemplateId,
} from '../../../core/constants/storybook.const';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SpaceUiModule } from '../space-ui.module';
import { SpaceInfoComponent } from './space-info.component';
import { MatDialogModule } from '@angular/material/dialog';

export default {
  title: 'Space/Space Info',
  component: SpaceInfoComponent,
  decorators: [
    moduleMetadata({
      imports: [
        MatSnackBarModule,
        HttpClientModule,
        TranslocoRootModule,
        MatDialogModule,
        MatIconModule,
        SbRouterModule,
        SbStoreModules,
        SpaceUiModule,
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
      'postsCount',
      'spaceId',
      'spaceName',
      'itemType',
      'followersCount',
      'profileId',
      'link',
      'address',
    ],
  },
};

const Template: Story<SpaceInfoComponent> = (args: SpaceInfoComponent) => ({
  component: SpaceInfoComponent,
  props: args,
});

export const SpaceInfo: Story<SpaceInfoComponent> = Template.bind({});
SpaceInfo.args = {
  postsCount: 15,
  followersCount: 1123,
  spaceName: 'Space Name',
  itemType: 'list',
};

SpaceInfo.parameters = params;
