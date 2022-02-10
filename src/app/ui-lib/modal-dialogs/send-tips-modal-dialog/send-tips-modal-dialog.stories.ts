import {
  componentWrapperDecorator,
  Meta,
  moduleMetadata,
  Story,
} from '@storybook/angular';

import {
  IconRegistryProviders,
  ProfileTemplate,
  SbDeviceRegistry,
  SbStoreModules,
} from '../../../core/constants/storybook.const';
import { HttpClientModule } from '@angular/common/http';
import { TranslocoRootModule } from '../../../transloco-root.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { ButtonsModule } from '../../buttons/buttons.module';
import { ContainersModule } from '../../containers/containers.module';
import { TranslocoMessageFormatModule } from '@ngneat/transloco-messageformat';
import { SendTipsModalDialogComponent } from './send-tips-modal-dialog.component';
import { AddressModule } from '../../address/address.module';
import { PipesModule } from '../../../shared/pipes/pipes.module';
import { AvatarModule } from '../../avatar/avatar.module';
import { InputModule } from '../../input/input.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export default {
  title: 'Modal/Modal Send Tips',
  component: SendTipsModalDialogComponent,
  decorators: [
    moduleMetadata({
      imports: [
        HttpClientModule,
        MatSnackBarModule,
        SbStoreModules,
        TranslocoRootModule,
        MatDialogModule,
        ButtonsModule,
        ContainersModule,
        TranslocoMessageFormatModule.forRoot(),
        PipesModule,
        AddressModule,
        AvatarModule,
        InputModule,
        BrowserAnimationsModule,
        MatButtonModule,
        FormsModule,
        ReactiveFormsModule,
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
            profile: ProfileTemplate,
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
    include: [],
  },
};

const Template: Story<SendTipsModalDialogComponent> = (
  args: SendTipsModalDialogComponent
) => ({
  component: SendTipsModalDialogComponent,
  props: args,
});

export const ModalSendTips: Story<SendTipsModalDialogComponent> = Template.bind(
  {}
);
ModalSendTips.args = {};

ModalSendTips.parameters = params;
