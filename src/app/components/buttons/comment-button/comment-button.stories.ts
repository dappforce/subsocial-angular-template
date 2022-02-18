import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { ButtonsModule } from '../buttons.module';
import { HttpClientModule } from '@angular/common/http';
import { IconRegistryProviders } from '../../../core/constants/storybook.const';
import { CommentButtonComponent } from './comment-button.component';

export default {
  title: 'Buttons/Comment Button',
  component: CommentButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [ButtonsModule, HttpClientModule],
      declarations: [],
      providers: [...IconRegistryProviders],
    }),
  ],
} as Meta;

const Template: Story<CommentButtonComponent> = (
  args: CommentButtonComponent
) => ({
  component: CommentButtonComponent,
  props: args,
});

export const CommentButton: Story<CommentButtonComponent> = Template.bind({});
CommentButton.args = {
  count: 10,
};
