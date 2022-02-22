import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { ButtonsModule } from '../buttons.module';
import { HttpClientModule } from '@angular/common/http';
import { IconRegistryProviders } from '../../../core/constants/storybook.const';
import { DownvoteButtonComponent } from './downvote-button.component';
import { I18NextModule } from 'angular-i18next';

export default {
  title: 'Buttons/Vote buttons/Downvote Button',
  component: DownvoteButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [ButtonsModule, HttpClientModule, I18NextModule],
      declarations: [],
      providers: [...IconRegistryProviders],
    }),
  ],
} as Meta;

const Template: Story<DownvoteButtonComponent> = (
  args: DownvoteButtonComponent
) => ({
  component: DownvoteButtonComponent,
  props: args,
});

export const Active: Story<DownvoteButtonComponent> = Template.bind({});
Active.args = {
  count: 10,
  isActive: true,
};

export const Default: Story<DownvoteButtonComponent> = Template.bind({});
Default.args = {
  count: 10,
  isActive: false,
};

export const Label: Story<DownvoteButtonComponent> = Template.bind({});
Label.args = {
  count: 10,
  isActive: true,
  isShowLabel: true,
};
