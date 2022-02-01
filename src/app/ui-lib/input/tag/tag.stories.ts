import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { TagComponent } from './tag.component';
import { InputModule } from '../input.module';

export default {
  title: 'Inputs/Tag',
  component: TagComponent,
  decorators: [
    moduleMetadata({
      imports: [InputModule],
      declarations: [],
      providers: [],
    }),
  ],
} as Meta;

const Template: Story<TagComponent> = (args: TagComponent) => ({
  component: TagComponent,
  props: args,
});

export const Tag: Story<TagComponent> = Template.bind({});
Tag.args = {
  tagName: 'subsocial',
};
