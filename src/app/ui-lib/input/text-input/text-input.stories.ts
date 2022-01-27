import {
  componentWrapperDecorator,
  Meta,
  moduleMetadata,
  Story,
} from '@storybook/angular';
import { IconRegistryProviders } from '../../../core/constants/storybook.const';
import { HttpClientModule } from '@angular/common/http';
import { TranslocoRootModule } from '../../../transloco-root.module';
import { InputModule } from '../input.module';
import { TextInputComponent } from './text-input.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export default {
  title: 'Inputs/Text Input',
  component: TextInputComponent,
  decorators: [
    moduleMetadata({
      imports: [
        HttpClientModule,
        InputModule,
        TranslocoRootModule,
        BrowserAnimationsModule,
      ],
      declarations: [],
      providers: [...IconRegistryProviders],
    }),
    componentWrapperDecorator((story) => {
      return `
      <div class="sb-container">
            ${story}
        </div>`;
    }),
  ],
} as Meta;

const params = {
  controls: {
    include: ['isRequired', 'label', 'error'],
  },
};

const Template: Story<TextInputComponent> = (args: TextInputComponent) => ({
  component: TextInputComponent,
  props: args,
});

export const TextInput: Story<TextInputComponent> = Template.bind({});
TextInput.args = {
  isRequired: true,
  label: 'Text input',
};

TextInput.parameters = params;

export const TextInputError: Story<TextInputComponent> = Template.bind({});
TextInputError.args = {
  isRequired: true,
  label: 'Text input',
  error: 'Field is required',
};

TextInputError.parameters = params;
