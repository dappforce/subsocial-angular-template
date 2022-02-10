import {
  componentWrapperDecorator,
  Meta,
  moduleMetadata,
  Story,
} from '@storybook/angular';

import {
  IconRegistryProviders,
  PostTemplate,
  ProfileTemplate,
  SbDeviceRegistry,
  SbRouterModule,
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
import { AddressModule } from '../../address/address.module';
import { PipesModule } from '../../../shared/pipes/pipes.module';
import { AvatarModule } from '../../avatar/avatar.module';
import { InputModule } from '../../input/input.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { SharePostModalDialogComponent } from './share-post-modal-dialog.component';
import { SpaceUiModule } from '../../space-ui/space-ui.module';
import { PostUiModule } from '../../post-ui/post-ui.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export default {
  title: 'Modal/Modal Share Post',
  component: SharePostModalDialogComponent,
  decorators: [
    moduleMetadata({
      imports: [
        HttpClientModule,
        MatSnackBarModule,
        SbStoreModules,
        SbRouterModule,
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
        SpaceUiModule,
        PostUiModule,
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
          useValue: PostTemplate,
        },
      ],
    }),
    componentWrapperDecorator((story) => {
      return `
      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap" rel="stylesheet">
      <div class="sb-modal-container"></div>
      <div class="sb-container" style="width: 760px; padding: 0" >
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

const Template: Story<SharePostModalDialogComponent> = (
  args: SharePostModalDialogComponent
) => ({
  component: SharePostModalDialogComponent,
  props: args,
});

export const ModalSharePost: Story<SharePostModalDialogComponent> =
  Template.bind({});
ModalSharePost.args = {};

ModalSharePost.parameters = params;
