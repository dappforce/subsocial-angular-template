import {
  componentWrapperDecorator,
  Meta,
  moduleMetadata,
  Story,
} from '@storybook/angular';
import { ButtonsModule } from '../buttons.module';
import { SignOutButtonComponent } from './sign-out-button.component';
import { I18NextModule } from 'angular-i18next';
import { HttpClientModule } from '@angular/common/http';
import { I18N_PROVIDERS } from '../../../locale/i18next.config';

export default {
  title: 'Buttons/Sign Out Button',
  component: SignOutButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [ButtonsModule, I18NextModule.forRoot(), HttpClientModule],
      declarations: [],
      providers: [...I18N_PROVIDERS],
    }),
    componentWrapperDecorator((story) => {
      return `
                  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap" rel="stylesheet">
                  <div>
                        ${story}
                   </div>`;
    }),
  ],
} as Meta;

const Template: Story<SignOutButtonComponent> = (
  args: SignOutButtonComponent
) => ({
  component: SignOutButtonComponent,
  props: args,
});

export const SignOutButton: Story<SignOutButtonComponent> = Template.bind({});
SignOutButton.args = {};
