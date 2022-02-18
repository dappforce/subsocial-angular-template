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
import { ContainersModule } from '../../containers/containers.module';
import { MatButtonModule } from '@angular/material/button';
import { ButtonsModule } from '../../buttons/buttons.module';
import { ConnectionsModalDialogComponent } from './connections-modal-dialog.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { SharedModule } from '../../../shared/shared.module';
import { TabLinkData } from '../../../core/models/tab-link-data.model';
import { I18N_PROVIDERS } from '../../../locale/i18next.config';

export default {
  title: 'Modal/Modal Connections',
  component: ConnectionsModalDialogComponent,
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
        MatSnackBarModule,
        MatDialogModule,
        SharedModule,
      ],
      declarations: [],
      providers: [
        ...IconRegistryProviders,
        ...SbDeviceRegistry,
        ...I18N_PROVIDERS,
        {
          provide: MatDialogRef,
          useValue: {},
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {},
        },
      ],
    }),
    componentWrapperDecorator((story) => {
      return `
      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap" rel="stylesheet">
      <div class="sb-modal-container"></div>
      <div class="sb-container" style="width: 480px; padding: 0" >
            ${story}
        </div>`;
    }),
  ],
} as Meta;

const params = {
  controls: {
    include: ['tabLinks', 'activeTab'],
  },
};

const Template: Story<ConnectionsModalDialogComponent> = (
  args: ConnectionsModalDialogComponent
) => ({
  component: ConnectionsModalDialogComponent,
  props: args,
});

const tabLinks: TabLinkData[] = [
  { tabName: 'following', additionalInfo: 0 },
  { tabName: 'followers', additionalInfo: 0 },
];

const activeTab: TabLinkData = { tabName: 'following', additionalInfo: 0 };

export const ModalConnections: Story<ConnectionsModalDialogComponent> =
  Template.bind({});
ModalConnections.args = {
  tabLinks: tabLinks,
  activeTab: activeTab,
};

ModalConnections.parameters = params;
