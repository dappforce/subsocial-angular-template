import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { ButtonsModule } from '../buttons.module';
import { HttpClientModule } from '@angular/common/http';
import { IconRegistryProviders } from '../../../core/constants/storybook.const';
import { I18NextModule } from 'angular-i18next';
import { SharedButtonComponent } from './shared-button.component';
import { I18N_PROVIDERS } from '../../../locale/i18next.config';

export default {
  title: 'Buttons/Shared Button',
  component: SharedButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [ButtonsModule, HttpClientModule, I18NextModule.forRoot()],
      declarations: [],
      providers: [...IconRegistryProviders, ...I18N_PROVIDERS],
    }),
  ],
} as Meta;

const Template: Story<SharedButtonComponent> = (
  args: SharedButtonComponent
) => ({
  component: SharedButtonComponent,
  props: args,
});

export const Default: Story<SharedButtonComponent> = Template.bind({});
Default.args = {};

export const Label: Story<SharedButtonComponent> = Template.bind({});
Label.args = {
  isShowLabel: true,
};
