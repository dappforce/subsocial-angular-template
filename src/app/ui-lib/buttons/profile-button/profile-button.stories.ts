import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { ButtonsModule } from '../buttons.module';
import { MatDialogModule } from '@angular/material/dialog';
import {
  BaseRef,
  ProfileTemplate,
  SbRouterModule,
  SbStoreModules,
} from '../../../core/constants/storybook.const';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslocoModule } from '@ngneat/transloco';
import { TranslocoRootModule } from '../../../transloco-root.module';
import { ProfileButtonComponent } from './profile-button.component';
import { of } from 'rxjs';

export default {
  title: 'Buttons/Profile Button',
  component: ProfileButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [
        ButtonsModule,
        MatDialogModule,
        SbRouterModule,
        HttpClientModule,
        MatSnackBarModule,
        ...SbStoreModules,
        TranslocoRootModule,
        TranslocoModule,
      ],
      declarations: [],
      providers: [BaseRef],
    }),
  ],
} as Meta;

const Template: Story<ProfileButtonComponent> = (
  args: ProfileButtonComponent
) => ({
  component: ProfileButtonComponent,
  props: args,
});

export const SignInButton: Story<ProfileButtonComponent> = Template.bind({});
SignInButton.args = {};

export const ProfileButton: Story<ProfileButtonComponent> = Template.bind({});
ProfileButton.args = {
  isAuthorized$: of(true),
  profileData$: of(ProfileTemplate),
};

SignInButton.parameters = {
  controls: { include: [] },
};

ProfileButton.parameters = {
  controls: { include: ['isAuthorized$', 'profileData$'] },
};
