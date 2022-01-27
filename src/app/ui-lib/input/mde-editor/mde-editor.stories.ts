import {
  componentWrapperDecorator,
  Meta,
  moduleMetadata,
  Story,
} from '@storybook/angular';

import { IconRegistryProviders } from '../../../core/constants/storybook.const';
import { HttpClientModule } from '@angular/common/http';
import { InputModule } from '../input.module';
import { MdeEditorComponent } from './mde-editor.component';

export default {
  title: 'Inputs/Markdown Editor',
  component: MdeEditorComponent,
  decorators: [
    moduleMetadata({
      imports: [HttpClientModule, InputModule],
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
    include: [
      'autoFocus',
      'placeholder',
      'isToolbarHidden',
      'height',
      'isRequired',
    ],
  },
};

const Template: Story<MdeEditorComponent> = (args: MdeEditorComponent) => ({
  component: MdeEditorComponent,
  props: args,
});

export const MarkdownEditor: Story<MdeEditorComponent> = Template.bind({});
MarkdownEditor.args = {
  autoFocus: true,
  placeholder: 'Placeholder',
  isToolbarHidden: false,
  isRequired: true,
  height: 100,
};

MarkdownEditor.parameters = params;
