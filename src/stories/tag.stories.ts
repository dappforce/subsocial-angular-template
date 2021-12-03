import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { TagComponent } from '../app/ui-lib/input/tag/tag.component';
import { SharedModule } from '../app/shared/shared.module';
import { InputModule } from '../app/ui-lib/input/input.module';

export default {
  title: 'Shared/Tag',
  component: TagComponent,
  argTypes: {
    size: {
      options: ['small', 'medium', 'large', 'huge'],
      control: 'select',
    },
  },
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [InputModule],
    }),
  ],
} as Meta;

const Template: Story<TagComponent> = (args: TagComponent) => ({
  props: args,
});

export const Tag = Template.bind({});
Tag.args = {
  tagName: 'subsocial',
  size: 'medium',
};
