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
  SbTemplateId,
} from '../../../core/constants/storybook.const';
import { HttpClientModule } from '@angular/common/http';
import { I18NextModule } from 'angular-i18next';
import { MatIconModule } from '@angular/material/icon';
import { ContainersModule } from '../../containers/containers.module';
import { MatButtonModule } from '@angular/material/button';
import { ButtonsModule } from '../../buttons/buttons.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { QrModalDialogComponent } from './qr-modal-dialog.component';
import { QRCodeModule } from 'angularx-qrcode';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { I18N_PROVIDERS } from '../../../locale/i18next.config';

export default {
  title: 'Modal/Modal Qr',
  component: QrModalDialogComponent,
  decorators: [
    moduleMetadata({
      imports: [
        HttpClientModule,
        I18NextModule.forRoot(),
        MatIconModule,
        SbRouterModule,
        SbStoreModules,
        ContainersModule,
        MatButtonModule,
        ButtonsModule,
        MatSnackBarModule,
        MatDialogModule,
        QRCodeModule,
        ClipboardModule,
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
          useValue: SbTemplateId,
        },
      ],
    }),
    componentWrapperDecorator((story) => {
      return `
      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap" rel="stylesheet">
      <div class="sb-modal-container"></div>
      <div class="sb-container" style="width: 345px; padding: 0" >
            ${story}
        </div>`;
    }),
  ],
} as Meta;

const Template: Story<QrModalDialogComponent> = (
  args: QrModalDialogComponent
) => ({
  component: QrModalDialogComponent,
  props: args,
});

export const ModalQr: Story<QrModalDialogComponent> = Template.bind({});
ModalQr.args = {};
