import {
  Meta,
  componentWrapperDecorator,
  moduleMetadata,
  Story,
} from '@storybook/angular';
import { TranslocoRootModule } from '../../../transloco-root.module';
import { HttpClientModule } from '@angular/common/http';
import {
  DISABLE_ARG,
  IconRegistryProviders,
  SbStoreModules,
} from '../../../core/constants/storybook.const';
import { CommentInputComponent } from './comment-input.component';
import { CommentModule } from '../comment.module';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

export default {
  title: 'Comments/Comment Input',
  component: CommentInputComponent,
  argTypes: {
    commentForm: DISABLE_ARG,
  },
  decorators: [
    moduleMetadata({
      imports: [
        ReactiveFormsModule,
        TranslocoRootModule,
        HttpClientModule,
        CommentModule,
        SbStoreModules,
      ],
      declarations: [],
      providers: [...IconRegistryProviders],
    }),
    componentWrapperDecorator((story) => {
      return `<div class="sb-container">
            ${story}
        </div>`;
    }),
  ],
} as Meta;

const Template: Story<CommentInputComponent> = (
  args: CommentInputComponent
) => ({
  component: CommentInputComponent,
  props: args,
});

const params = {
  controls: {
    include: [
      'commentForm',
      'showSendButton',
      'disabledButton',
      'isSending',
      'autofocus',
      'type',
    ],
  },
};

const commentForm = new FormControl('', { validators: Validators.required });

export const CommentInput: Story<CommentInputComponent> = Template.bind({});
CommentInput.args = {
  commentForm,
  showSendButton: true,
  autofocus: true,
  disabledButton: false,
};
CommentInput.parameters = params;
