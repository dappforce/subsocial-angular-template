import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { ButtonsModule } from '../buttons.module';
import { I18NextModule } from 'angular-i18next';
import { HttpClientModule } from '@angular/common/http';
import { TxButtonComponent } from './tx-button.component';

export default {
  title: 'Buttons/Tx Button',
  component: TxButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [ButtonsModule, I18NextModule, HttpClientModule],
      declarations: [],
      providers: [],
    }),
  ],
} as Meta;

const Template: Story<TxButtonComponent> = (args: TxButtonComponent) => ({
  component: TxButtonComponent,
  props: args,
});

export const Default: Story<TxButtonComponent> = Template.bind({});
Default.args = {
  name: 'Tx Button',
};

export const Sending: Story<TxButtonComponent> = Template.bind({});
Sending.args = {
  name: 'Tx Button',
  isSending: true,
};

export const Disabled: Story<TxButtonComponent> = Template.bind({});
Disabled.args = {
  name: 'Tx Button',
  isDisabled: true,
};
