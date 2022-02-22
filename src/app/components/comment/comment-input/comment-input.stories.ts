import {
  Meta,
  componentWrapperDecorator,
  moduleMetadata,
  Story,
} from '@storybook/angular';
import { I18NextModule } from 'angular-i18next';
import { HttpClientModule } from '@angular/common/http';
import {
  DISABLE_ARG,
  IconRegistryProviders,
  SbStoreModules,
} from '../../../core/constants/storybook.const';
import { CommentInputComponent } from './comment-input.component';
import { CommentModule } from '../comment.module';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { I18N_PROVIDERS } from '../../../locale/i18next.config';

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
        I18NextModule.forRoot(),
        HttpClientModule,
        CommentModule,
        SbStoreModules,
      ],
      declarations: [],
      providers: [...IconRegistryProviders, ...I18N_PROVIDERS],
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
