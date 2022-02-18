import {
  componentWrapperDecorator,
  Meta,
  moduleMetadata,
  Story,
} from '@storybook/angular';
import { HttpClientModule } from '@angular/common/http';
import { I18NextModule } from 'angular-i18next';
import { MatIconModule } from '@angular/material/icon';
import {
  IconRegistryProviders,
  SbDeviceRegistry,
  SbRouterModule,
  SbStoreModules,
  SpaceTemplate,
} from '../../../core/constants/storybook.const';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SpaceUiModule } from '../space-ui.module';
import { MatDialogModule } from '@angular/material/dialog';
import { SpaceItemComponent } from './space-item.component';
import { of } from 'rxjs';
import { TranslocoMessageFormatModule } from '@ngneat/transloco-messageformat';
import { I18N_PROVIDERS } from '../../../locale/i18next.config';

export default {
  title: 'Space/Space Item',
  component: SpaceItemComponent,
  decorators: [
    moduleMetadata({
      imports: [
        MatSnackBarModule,
        HttpClientModule,
        I18NextModule.forRoot(),
        MatDialogModule,
        MatIconModule,
        SbRouterModule,
        SbStoreModules,
        SpaceUiModule,
        TranslocoMessageFormatModule.forRoot(),
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
    include: ['space', 'isEdit', 'itemType', 'showHidden', 'isFollowed$'],
  },
};

const Template: Story<SpaceItemComponent> = (args: SpaceItemComponent) => ({
  component: SpaceItemComponent,
  props: args,
});

export const SpaceItem: Story<SpaceItemComponent> = Template.bind({});
SpaceItem.args = {
  space: SpaceTemplate,
  itemType: 'list',
  isFollowed$: of(true),
};

SpaceItem.parameters = params;
