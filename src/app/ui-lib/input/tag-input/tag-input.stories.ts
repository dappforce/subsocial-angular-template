import {
  componentWrapperDecorator,
  Meta,
  moduleMetadata,
  Story,
} from '@storybook/angular';

import { IconRegistryProviders } from '../../../core/constants/storybook.const';
import { HttpClientModule } from '@angular/common/http';
import { InputModule } from '../input.module';
import { TagInputComponent } from './tag-input.component';
import { FormControl } from '@angular/forms';
import { TranslocoRootModule } from '../../../transloco-root.module';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export default {
  title: 'Inputs/Tag Input',
  component: TagInputComponent,
  decorators: [
    moduleMetadata({
      imports: [
        HttpClientModule,
        InputModule,
        TranslocoRootModule,
        MatIconModule,
        BrowserAnimationsModule,
      ],
      declarations: [],
      providers: [...IconRegistryProviders],
    }),
    componentWrapperDecorator((story) => {
      return `
    <link
      href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet"
    />
      <div class="sb-container">
            ${story}
        </div>`;
    }),
  ],
} as Meta;

const params = {
  controls: {
    include: ['tags', 'tagCtrl'],
  },
};

const Template: Story<TagInputComponent> = (args: TagInputComponent) => ({
  component: TagInputComponent,
  props: args,
});

const tagCtrl = new FormControl('');

export const TagInput: Story<TagInputComponent> = Template.bind({});
TagInput.args = {
  tags: ['subsocial', 'polkadot'],
  tagCtrl,
};

TagInput.parameters = params;
