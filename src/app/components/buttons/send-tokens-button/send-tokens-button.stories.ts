import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { ButtonsModule } from '../buttons.module';
import { HttpClientModule } from '@angular/common/http';
import { IconRegistryProviders } from '../../../core/constants/storybook.const';
import { I18NextModule } from 'angular-i18next';
import { SendTokensButtonComponent } from './send-tokens-button.component';

export default {
  title: 'Buttons/Send Tokens Button',
  component: SendTokensButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [ButtonsModule, HttpClientModule, I18NextModule],
      declarations: [],
      providers: [...IconRegistryProviders],
    }),
  ],
} as Meta;

const Template: Story<SendTokensButtonComponent> = (
  args: SendTokensButtonComponent
) => ({
  component: SendTokensButtonComponent,
  props: args,
});

export const SendTokensButton: Story<SendTokensButtonComponent> = Template.bind(
  {}
);
SendTokensButton.args = {};
