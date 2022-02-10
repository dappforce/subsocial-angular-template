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
import { TranslocoRootModule } from '../../../transloco-root.module';
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
import { TranslocoMessageFormatModule } from '@ngneat/transloco-messageformat';
import { SharedModule } from '../../../shared/shared.module';
import { SignInModalDialogComponent } from './sign-in-modal-dialog.component';
import { ACCOUNT_STATUS } from '../../../shared/services/account.service';

export default {
  title: 'Modal/Modal Login',
  component: SignInModalDialogComponent,
  decorators: [
    moduleMetadata({
      imports: [
        HttpClientModule,
        TranslocoRootModule,
        MatIconModule,
        SbRouterModule,
        SbStoreModules,
        ContainersModule,
        MatButtonModule,
        ButtonsModule,
        MatSnackBarModule,
        MatDialogModule,
        TranslocoMessageFormatModule.forRoot(),
        SharedModule,
      ],
      declarations: [],
      providers: [
        ...IconRegistryProviders,
        ...SbDeviceRegistry,
        {
          provide: MatDialogRef,
          useValue: {},
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            status: ACCOUNT_STATUS.EXTENSION_NOT_FOUND,
          },
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
    include: ['data'],
  },
};

const Template: Story<SignInModalDialogComponent> = (
  args: SignInModalDialogComponent
) => ({
  component: SignInModalDialogComponent,
  props: args,
});

export const ModalLogin: Story<SignInModalDialogComponent> = Template.bind({});
ModalLogin.args = {
  data: {
    status: ACCOUNT_STATUS.EXTENSION_NOT_FOUND,
  },
};

ModalLogin.parameters = params;
