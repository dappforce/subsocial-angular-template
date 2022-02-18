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
import { I18NextModule } from 'angular-i18next';
import { ProfileButtonComponent } from './profile-button.component';
import { of } from 'rxjs';
import { I18N_PROVIDERS } from '../../../locale/i18next.config';

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
        I18NextModule.forRoot(),
      ],
      declarations: [],
      providers: [BaseRef, ...I18N_PROVIDERS],
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
  balance$: of('10.0123'),
};

SignInButton.parameters = {
  controls: { include: [] },
};

ProfileButton.parameters = {
  controls: { include: ['isAuthorized$', 'profileData$', 'balance$'] },
};
