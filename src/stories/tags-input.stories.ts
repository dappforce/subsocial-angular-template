import { Story, Meta } from '@storybook/angular/types-6-0';
import { componentWrapperDecorator, moduleMetadata } from '@storybook/angular';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../app/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TagInputComponent } from '../app/ui-lib/input/tag-input/tag-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';

export default {
  title: 'Inputs/Tags Input',
  component: TagInputComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        CommonModule,
        MatChipsModule,
        MatIconModule,
        SharedModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        FormsModule,
      ],
    }),
    componentWrapperDecorator((story) => {
      return `<div style="background-color: white; padding: 16px" class="container">
            ${story}
        </div>`;
    }),
  ],
} as Meta;

const Template: Story<TagInputComponent> = (args: TagInputComponent) => ({
  props: args,
});

export const TagsInput = Template.bind({});
const component = new TagInputComponent();

TagsInput.args = {
  ...component,
  tags: ['subsocial', 'polkadot', 'substrate'],
};
