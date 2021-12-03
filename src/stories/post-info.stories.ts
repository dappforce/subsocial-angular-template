import { Meta, Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { PostInfoComponent } from '../app/ui-lib/post-ui/post-info/post-info.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { PostUiModule } from '../app/ui-lib/post-ui/post-ui.module';

export default {
  title: 'Post/Post Info',
  component: PostInfoComponent,
  argTypes: {},
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [PostUiModule, HttpClientModule, RouterModule.forRoot([])],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
    }),
  ],
} as Meta;

const Template: Story<PostInfoComponent> = (args: PostInfoComponent) => ({
  props: args,
});

export const PostInfo = Template.bind({});
PostInfo.args = {
  imageUrl: 'assets/avatar1.png',
  spaceName: 'Subsocial',
  createdAtTime: 1613161818000,
  userName: 'Young Beef 4.0',
};
