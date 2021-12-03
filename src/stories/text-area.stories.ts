import { Story, Meta } from '@storybook/angular/types-6-0';
import { componentWrapperDecorator, moduleMetadata } from '@storybook/angular';
import { HttpClientModule } from '@angular/common/http';
import { TextAreaComponent } from '../app/ui-lib/input/text-area/text-area.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputModule } from '../app/ui-lib/input/input.module';

export default {
  title: 'Inputs/Text Area',
  component: TextAreaComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [InputModule, HttpClientModule, BrowserAnimationsModule],
    }),
    componentWrapperDecorator((story) => {
      return `<div style="background-color: white; padding: 16px" class="container">
            ${story}
        </div>`;
    }),
  ],
} as Meta;

const Template: Story<TextAreaComponent> = (args: TextAreaComponent) => ({
  props: args,
});

export const TextArea = Template.bind({});
const component = new TextAreaComponent();
TextArea.args = {
  ...component,
  label: 'Label',
};
