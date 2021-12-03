import { Story, Meta } from '@storybook/angular/types-6-0';
import { componentWrapperDecorator, moduleMetadata } from '@storybook/angular';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { IconRegistryService } from '../app/shared/services/icon-registry.service';
import { APP_INITIALIZER } from '@angular/core';
import { AppModule, registryIcons } from '../app/app.module';
import { CommentMessageComponent } from '../app/ui-lib/comment/comment-message/comment-message.component';
import { CommentModule } from '../app/ui-lib/comment/comment.module';
import { DeviceService } from '../app/shared/services/device.service';

function initDeviceService(deviceService: DeviceService) {
  return () => deviceService.init();
}

export default {
  title: 'Comment/Comment Message',
  component: CommentMessageComponent,
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

const Template: Story<CommentMessageComponent> = (
  args: CommentMessageComponent
) => ({
  props: args,
});

export const CommentMessage = Template.bind({});

const d = new Date();
CommentMessage.args = {
  commentData: {
    profileName: 'Freeman',
    createdAtTime: d.setHours(d.getHours() - 2),
    avatar: 'assets/avatar1.png',
    commentText:
      'Sin duda una de las principales preguntas en el aire, ¿cómo será la vuelta al trabajo cuando se acabe la pandemia?',
    upvoteCount: 135,
    downvoteCount: 42,
    ownerId: '',
    replyCount: 2,
    postId: '',
  },
};
