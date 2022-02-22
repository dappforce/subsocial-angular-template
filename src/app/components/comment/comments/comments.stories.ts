import {
  Meta,
  componentWrapperDecorator,
  moduleMetadata,
  Story,
} from '@storybook/angular';

import {
  DISABLE_ARG,
  IconRegistryProviders,
  PostTemplate,
  SbRouterModule,
  SbStoreModules,
} from '../../../core/constants/storybook.const';
import { CommentModule } from '../comment.module';
import { CommentsComponent } from './comments.component';
import { I18NextModule } from 'angular-i18next';
import { TranslocoMessageFormatModule } from '@ngneat/transloco-messageformat';
import { I18N_PROVIDERS } from '../../../locale/i18next.config';

export default {
  title: 'Comments/Comments',
  component: CommentsComponent,
  argTypes: {
    rootPost: DISABLE_ARG,
  },
  decorators: [
    moduleMetadata({
      imports: [
        SbStoreModules,
        CommentModule,
        SbRouterModule,
        I18NextModule.forRoot(),
        TranslocoMessageFormatModule.forRoot(),
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

const Template: Story<CommentsComponent> = (args: CommentsComponent) => ({
  component: CommentsComponent,
  props: args,
});

// const params = {
//   controls: {
//     include: [
//       'commentForm',
//       'showSendButton',
//       'disabledButton',
//       'isSending',
//       'autofocus',
//       'type',
//     ],
//   },
// };

export const Comments: Story<CommentsComponent> = Template.bind({});
Comments.args = {
  rootPost: PostTemplate,
  repliesCount: 0,
};
// CommentInput.parameters = params;
