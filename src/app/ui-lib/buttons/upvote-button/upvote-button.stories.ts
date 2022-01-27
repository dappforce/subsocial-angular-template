import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { ButtonsModule } from '../buttons.module';
import { HttpClientModule } from '@angular/common/http';
import { IconRegistryProviders } from '../../../core/constants/storybook.const';
import { TranslocoRootModule } from '../../../transloco-root.module';
import { UpvoteButtonComponent } from './upvote-button.component';

export default {
  title: 'Buttons/Vote buttons/Upvote Button',
  component: UpvoteButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [ButtonsModule, HttpClientModule, TranslocoRootModule],
      declarations: [],
      providers: [...IconRegistryProviders],
    }),
  ],
} as Meta;

const Template: Story<UpvoteButtonComponent> = (
  args: UpvoteButtonComponent
) => ({
  component: UpvoteButtonComponent,
  props: args,
});

export const Active: Story<UpvoteButtonComponent> = Template.bind({});
Active.args = {
  count: 10,
  isActive: true,
};

export const Default: Story<UpvoteButtonComponent> = Template.bind({});
Default.args = {
  count: 10,
  isActive: false,
};

export const Label: Story<UpvoteButtonComponent> = Template.bind({});
Label.args = {
  count: 10,
  isActive: true,
  isShowLabel: true,
};
