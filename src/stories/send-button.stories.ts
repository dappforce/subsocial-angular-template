import { Meta, Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { MatButtonModule } from '@angular/material/button';
import { SendButtonComponent } from '../app/ui-lib/buttons/send-button/send-button.component';
import { ButtonsModule } from '../app/ui-lib/buttons/buttons.module';

export default {
  title: 'Buttons/Send Button',
  component: SendButtonComponent,
  argTypes: {},
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [MatButtonModule, ButtonsModule],
    }),
  ],
} as Meta;

const Template: Story<SendButtonComponent> = (args: SendButtonComponent) => ({
  props: args,
});

export const SendButton = Template.bind({});
SendButton.args = {
  isDisabled: false,
};
