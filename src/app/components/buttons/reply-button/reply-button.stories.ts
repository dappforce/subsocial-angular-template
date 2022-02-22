import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { ButtonsModule } from '../buttons.module';
import { HttpClientModule } from '@angular/common/http';
import { IconRegistryProviders } from '../../../core/constants/storybook.const';
import { I18NextModule } from 'angular-i18next';
import { ReplyButtonComponent } from './reply-button.component';
import { I18N_PROVIDERS } from '../../../locale/i18next.config';

export default {
  title: 'Buttons/Reply Button',
  component: ReplyButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [ButtonsModule, HttpClientModule, I18NextModule.forRoot()],
      declarations: [],
      providers: [...IconRegistryProviders, ...I18N_PROVIDERS],
    }),
  ],
} as Meta;

const Template: Story<ReplyButtonComponent> = (args: ReplyButtonComponent) => ({
  component: ReplyButtonComponent,
  props: args,
});

export const ReplyButton: Story<ReplyButtonComponent> = Template.bind({});
ReplyButton.args = {
  isShowLabel: true,
};
