import {
  componentWrapperDecorator,
  Meta,
  moduleMetadata,
  Story,
} from '@storybook/angular';

import {
  IconRegistryProviders,
  SbDeviceRegistry,
  SbStoreModules,
} from '../../../core/constants/storybook.const';
import { HttpClientModule } from '@angular/common/http';
import { I18NextModule } from 'angular-i18next';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { FollowersModalDialogComponent } from './followers-modal-dialog.component';
import { ButtonsModule } from '../../buttons/buttons.module';
import { ContainersModule } from '../../containers/containers.module';
import { AppModule } from '../../../app.module';
import { TranslocoMessageFormatModule } from '@ngneat/transloco-messageformat';
import { I18N_PROVIDERS } from '../../../locale/i18next.config';

export default {
  title: 'Modal/Modal Followers',
  component: FollowersModalDialogComponent,
  decorators: [
    moduleMetadata({
      imports: [
        HttpClientModule,
        MatSnackBarModule,
        SbStoreModules,
        I18NextModule.forRoot(),
        MatDialogModule,
        ButtonsModule,
        ContainersModule,
        TranslocoMessageFormatModule.forRoot(),
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
          useValue: {
            spaceId: '0',
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
    include: ['followersIds'],
  },
};

const Template: Story<FollowersModalDialogComponent> = (
  args: FollowersModalDialogComponent
) => ({
  component: FollowersModalDialogComponent,
  props: args,
});

export const ModalFollowers: Story<FollowersModalDialogComponent> =
  Template.bind({});
ModalFollowers.args = {
  followersIds: [],
};

ModalFollowers.parameters = params;
