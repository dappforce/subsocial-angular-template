import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { ButtonsModule } from '../buttons.module';
import { SignOutButtonComponent } from './sign-out-button.component';
import { TranslocoRootModule } from '../../../transloco-root.module';
import { HttpClientModule } from '@angular/common/http';

export default {
  title: 'Buttons/Sign Out Button',
  component: SignOutButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [ButtonsModule, TranslocoRootModule, HttpClientModule],
      declarations: [],
      providers: [],
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
