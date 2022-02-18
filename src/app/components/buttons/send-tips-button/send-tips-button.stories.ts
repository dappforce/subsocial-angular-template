import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { ButtonsModule } from '../buttons.module';
import { HttpClientModule } from '@angular/common/http';
import { IconRegistryProviders } from '../../../core/constants/storybook.const';
import { I18NextModule } from 'angular-i18next';
import { SendTipsButtonComponent } from './send-tips-button.component';
import { MatDialogModule } from '@angular/material/dialog';
import { I18N_PROVIDERS } from '../../../locale/i18next.config';

export default {
  title: 'Buttons/Send Tips Button',
  component: SendTipsButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [
        ButtonsModule,
        HttpClientModule,
        I18NextModule.forRoot(),
        MatDialogModule,
      ],
      declarations: [],
      providers: [...IconRegistryProviders, ...I18N_PROVIDERS],
    }),
  ],
} as Meta;

const Template: Story<SendTipsButtonComponent> = (
  args: SendTipsButtonComponent
) => ({
  component: SendTipsButtonComponent,
  props: args,
});

export const SendTipsButton: Story<SendTipsButtonComponent> = Template.bind({});
SendTipsButton.args = {};
