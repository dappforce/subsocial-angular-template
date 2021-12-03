import { Story, Meta } from '@storybook/angular/types-6-0';
import { componentWrapperDecorator, moduleMetadata } from '@storybook/angular';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { IconRegistryService } from '../app/shared/services/icon-registry.service';
import { APP_INITIALIZER } from '@angular/core';
import { AppModule, registryIcons } from '../app/app.module';
import { CommentsComponent } from '../app/ui-lib/comment/comments/comments.component';
import { CommentModule } from '../app/ui-lib/comment/comment.module';
import { DeviceService } from '../app/shared/services/device.service';

function initDeviceService(deviceService: DeviceService) {
  return () => deviceService.init();
}

export default {
  title: 'Comment/Comments',
  component: CommentsComponent,
  decorators: [
    moduleMetadata({
      providers: [
        IconRegistryService,
        {
          provide: APP_INITIALIZER,
          useFactory: registryIcons,
          deps: [IconRegistryService],
          multi: true,
        },
        { provide: APP_BASE_HREF, useValue: '/' },
        {
          provide: APP_INITIALIZER,
          useFactory: initDeviceService,
          multi: true,
          deps: [DeviceService],
        },
      ],
      declarations: [],
      imports: [
        RouterModule.forRoot([]),
        CommentModule,
        HttpClientModule,
        AppModule,
      ],
    }),
    componentWrapperDecorator((story) => {
      return `<div class="container" style="background-color: white; padding: 16px; border-radius: 4px">
            ${story}
        </div>`;
    }),
  ],
} as Meta;

const Template: Story<CommentsComponent> = (args: CommentsComponent) => ({
  props: args,
});

export const Comments = Template.bind({});
const d = new Date();
Comments.args = {
  commentsCount: '1 Comment',
  commentListData: [
    {
      profileName: 'Freeman',
      createdAtTime: d.setHours(d.getHours() - 2),
      avatar: 'Qmasp4JHhQWPkEpXLHFhMAQieAH1wtfVRNHWZ5snhfFeBe',
      commentText:
        'Sin duda una de las principales preguntas en el aire, ¿cómo será la vuelta al trabajo cuando se acabe la pandemia?',
      upvoteCount: 135,
      downvoteCount: 42,
      ownerId: '',
      replyCount: 2,
      postId: '',
    },
  ],
};
