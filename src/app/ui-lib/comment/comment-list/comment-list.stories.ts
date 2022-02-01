import {
  Meta,
  componentWrapperDecorator,
  moduleMetadata,
  Story,
} from '@storybook/angular';

import {
  DISABLE_ARG,
  IconRegistryProviders,
  PostCommentTemplate,
  PostTemplate,
  SbRouterModule,
  SbStoreModules,
} from '../../../core/constants/storybook.const';
import { CommentModule } from '../comment.module';
import { TranslocoRootModule } from '../../../transloco-root.module';
import { CommentListComponent } from './comment-list.component';
import { of } from 'rxjs';
import { MarkdownModule } from 'ngx-markdown';

export default {
  title: 'Comments/Comment List',
  component: CommentListComponent,
  argTypes: {
    rootPost: DISABLE_ARG,
    comments$: DISABLE_ARG,
    parentPost$: DISABLE_ARG,
    commentsCount$: DISABLE_ARG,
    isChildrenShow$: DISABLE_ARG,
  },
  decorators: [
    moduleMetadata({
      imports: [
        SbStoreModules,
        CommentModule,
        SbRouterModule,
        TranslocoRootModule,
        MarkdownModule.forRoot(),
      ],
      declarations: [],
      providers: [...IconRegistryProviders],
    }),
    componentWrapperDecorator((story) => {
      return `
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap" rel="stylesheet">
  <div class="sb-container">
            ${story}
        </div>`;
    }),
  ],
} as Meta;

const Template: Story<CommentListComponent> = (args: CommentListComponent) => ({
  component: CommentListComponent,
  props: args,
});

const params = {
  controls: {
    include: [
      'rootPostId',
      'parentPostId',
      'comments$',
      'parentPost$',
      'parentId',
      'commentsCount$',
      'isChildrenShow$',
      'isShowInput',
    ],
  },
};

export const CommentList: Story<CommentListComponent> = Template.bind({});
CommentList.args = {
  rootPostId: '1001',
  parentPostId: '1001',
  comments$: of([PostCommentTemplate, PostCommentTemplate]),
  parentPost$: of(PostTemplate),
  parentId: '1001',
  commentsCount$: of(2),
  isChildrenShow$: of(true),
  isShowInput: true,
};
CommentList.parameters = params;
