import { Story, Meta } from '@storybook/angular/types-6-0';
import { componentWrapperDecorator, moduleMetadata } from '@storybook/angular';
import { TextInputComponent } from '../app/ui-lib/input/text-input/text-input.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputModule } from '../app/ui-lib/input/input.module';

export default {
  title: 'Inputs/Text Input',
  component: TextInputComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [InputModule, BrowserAnimationsModule],
    }),
    componentWrapperDecorator((story) => {
      return `<div style="background-color: white; padding: 16px" class="container">
            ${story}
        </div>`;
    }),
  ],
} as Meta;

const Template: Story<TextInputComponent> = (args: TextInputComponent) => ({
  props: args,
});

export const TextInput = Template.bind({});
const component = new TextInputComponent();
TextInput.args = {
  ...component,
  label: 'Label',
};
