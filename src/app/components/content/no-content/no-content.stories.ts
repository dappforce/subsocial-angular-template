
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { ContentModule } from '../content.module';
import { NoContentComponent } from './no-content.component';

export default {
  title: 'Content/No Content',
  component: NoContentComponent,
  decorators: [
    moduleMetadata({
      imports: [ContentModule],
      declarations: [],
      providers: [],
    }),
  ],
} as Meta;

const Template: Story<NoContentComponent> = (args: NoContentComponent) => ({
  component: NoContentComponent,
  props: args,
});

export const NoContent: Story<NoContentComponent> = Template.bind({});
NoContent.args = {
  text: 'Posts not found',
};
