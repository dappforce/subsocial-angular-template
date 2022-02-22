import {
  componentWrapperDecorator,
  Meta,
  moduleMetadata,
  Story,
} from '@storybook/angular';

import {
  IconRegistryProviders,
  SbDeviceRegistry,
  SbRouterModule,
  SbStoreModules,
} from '../../../core/constants/storybook.const';
import { HttpClientModule } from '@angular/common/http';
import { I18NextModule } from 'angular-i18next';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdblockConflictModalDialogComponent } from './adblock-conflict-modal-dialog.component';
import { ContainersModule } from '../../containers/containers.module';
import { MatButtonModule } from '@angular/material/button';
import { ButtonsModule } from '../../buttons/buttons.module';
import { I18N_PROVIDERS } from '../../../locale/i18next.config';

export default {
  title: 'Modal/Modal Adblock',
  component: AdblockConflictModalDialogComponent,
  decorators: [
    moduleMetadata({
      imports: [
        HttpClientModule,
        I18NextModule.forRoot(),
        MatIconModule,
        BrowserAnimationsModule,
        SbRouterModule,
        SbStoreModules,
        ContainersModule,
        MatButtonModule,
        ButtonsModule,
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
      <div class="sb-modal-container"></div>
      <div class="sb-container" style="width: 430px">
            ${story}
        </div>`;
    }),
  ],
} as Meta;

const Template: Story<AdblockConflictModalDialogComponent> = (
  args: AdblockConflictModalDialogComponent
) => ({
  component: AdblockConflictModalDialogComponent,
  props: args,
});

export const ModalAdblock: Story<AdblockConflictModalDialogComponent> =
  Template.bind({});
ModalAdblock.args = {};
