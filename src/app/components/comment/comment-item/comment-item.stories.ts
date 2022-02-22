import {
  Meta,
  componentWrapperDecorator,
  moduleMetadata,
  Story,
} from '@storybook/angular';
import { I18NextModule } from 'angular-i18next';
import {
  IconRegistryProviders,
  PostCommentTemplate,
  SbRouterModule,
  SbStoreModules,
} from '../../../core/constants/storybook.const';
import { CommentModule } from '../comment.module';
import { CommentItemComponent } from './comment-item.component';
import { MarkdownModule } from 'ngx-markdown';
import { MenuModule } from '../../menu/menu.module';
import { I18N_PROVIDERS } from '../../../locale/i18next.config';

export default {
  title: 'Comments/Comment Item',
  component: CommentItemComponent,
  decorators: [
    moduleMetadata({
      imports: [
        SbStoreModules,
        CommentModule,
        SbRouterModule,
        MenuModule,
        I18NextModule.forRoot(),
        MarkdownModule.forRoot(),
      ],
      declarations: [],
      providers: [...IconRegistryProviders, ...I18N_PROVIDERS],
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

const Template: Story<CommentItemComponent> = (args: CommentItemComponent) => ({
  component: CommentItemComponent,
  props: args,
});

const params = {
  controls: {
    include: ['comment', 'isEdit'],
  },
};

export const Default: Story<CommentItemComponent> = Template.bind({});
Default.args = {
  comment: PostCommentTemplate,
};
Default.parameters = params;

export const Edit: Story<CommentItemComponent> = Template.bind({});
Edit.args = {
  comment: PostCommentTemplate,
  isEdit: true,
};
Edit.parameters = params;
