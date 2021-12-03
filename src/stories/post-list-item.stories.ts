import { Story, Meta } from '@storybook/angular/types-6-0';
import { componentWrapperDecorator, moduleMetadata } from '@storybook/angular';
import { HttpClientModule } from '@angular/common/http';
import { IconRegistryService } from '../app/shared/services/icon-registry.service';
import { APP_INITIALIZER } from '@angular/core';
import { AppModule, registryIcons } from '../app/app.module';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { PostItemComponent } from '../app/ui-lib/post-ui/post-item/post-item.component';
import { PostUiModule } from '../app/ui-lib/post-ui/post-ui.module';
import { DeviceService } from '../app/shared/services/device.service';

function initDeviceService(deviceService: DeviceService) {
  return () => deviceService.init();
}

export default {
  title: 'Post/Post Item',
  component: PostItemComponent,
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
        PostUiModule,
        HttpClientModule,
        AppModule,
      ],
    }),
    componentWrapperDecorator((story) => {
      return `<div class="container">
            ${story}
        </div>`;
    }),
  ],
} as Meta;

const Template: Story<PostItemComponent> = (args: PostItemComponent) => ({
  props: args,
});

export const PostItem = Template.bind({});
PostItem.args = {
  postItemData: {
    id: '3t8GGfcxxXiTUmGiTKp2jS611wucGs4K7zvr2UmXrawoWYLD',
    body: '',
    createdAtTime: 1613161818000,
    downvotesCount: 0,
    hiddenRepliesCount: 0,
    imageUrl: 'assets/post-image-example.png',
    isComment: false,
    isSharedPost: false,
    isShowMore: false,
    ownerId: '3osmnRNnrcScHsgkTJH1xyBF5kGjpbWHsGrqM31BJpy4vwn8',
    ownerImageUrl: 'Qmasp4JHhQWPkEpXLHFhMAQieAH1wtfVRNHWZ5snhfFeBe',
    ownerName: 'Subsocial',
    postLink: '/@subsocial/Your-comment-is-a-post-188',
    repliesCount: 0,
    sharesCount: 0,
    spaceId: '1',
    hidden: false,
    isMyPost: false,
    spaceName: 'subsocial',
    summary:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ... ',
    tags: ['FAQ', 'SEO', 'UX', 'Feature'],
    title: 'Anonouncing The Subsocial Spacers Program 2.0',
    upvotesCount: 2,
    visibleRepliesCount: 0,
  },
};
