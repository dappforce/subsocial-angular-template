import { Meta, Story } from '@storybook/angular/types-6-0';
import { FollowButtonComponent } from '../app/ui-lib/buttons/follow-button/follow-button.component';
import { moduleMetadata } from '@storybook/angular';
import { MatButtonModule } from '@angular/material/button';
import { ButtonsModule } from '../app/ui-lib/buttons/buttons.module';

export default {
  title: 'Buttons/Follow Button',
  component: FollowButtonComponent,
  argTypes: {},
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [MatButtonModule, ButtonsModule],
    }),
  ],
} as Meta;

const Template: Story<FollowButtonComponent> = (
  args: FollowButtonComponent
) => ({
  props: args,
});

export const FollowButton = Template.bind({});
FollowButton.args = {
  isFollow: false,
};
