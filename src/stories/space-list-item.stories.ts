import { Story, Meta } from '@storybook/angular/types-6-0';
import { componentWrapperDecorator, moduleMetadata } from '@storybook/angular';
import { HttpClientModule } from '@angular/common/http';
import { IconRegistryService } from '../app/shared/services/icon-registry.service';
import { APP_INITIALIZER } from '@angular/core';
import { registryIcons } from '../app/app.module';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { SpaceItemComponent } from '../app/ui-lib/space-ui/space-item/space-item.component';
import { SpaceUiModule } from '../app/ui-lib/space-ui/space-ui.module';
import { MatDialogModule } from '@angular/material/dialog';
import { DirectivesModule } from '../app/shared/directives/directives.module';

export default {
  title: 'Space/Space List Item',
  component: SpaceItemComponent,
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
      ],
      declarations: [],
      imports: [
        RouterModule.forRoot([]),
        SpaceUiModule,
        HttpClientModule,
        MatDialogModule,
        DirectivesModule,
      ],
    }),
    componentWrapperDecorator((story) => {
      return `<div class="container">
            ${story}
        </div>`;
    }),
  ],
} as Meta;

const Template: Story<SpaceItemComponent> = (args: SpaceItemComponent) => ({
  props: args,
});

export const SpaceListItem = Template.bind({});
SpaceListItem.args = {
  spaceItemData: {
    id: '1',
    struct: {
      createdByAccount: '3osmnRNnrcScHsgkTJH1xyBF5kGjpbWHsGrqM31BJpy4vwn8',
      createdAtBlock: 0,
      createdAtTime: 0,
      isUpdated: true,
      updatedByAccount: '3osmnRNnrcScHsgkTJH1xyBF5kGjpbWHsGrqM31BJpy4vwn8',
      updatedAtBlock: 1976464,
      updatedAtTime: 1608780324000,
      contentId: 'bafyreib3mgbou4xln42qqcgj6qlt3cif35x4ribisxgq7unhpun525l54e',
      id: '1',
      ownerId: '3osmnRNnrcScHsgkTJH1xyBF5kGjpbWHsGrqM31BJpy4vwn8',
      hidden: false,
      handle: 'subsocial',
      canFollowerCreatePosts: false,
      canEveryoneCreatePosts: false,
      postsCount: 72,
      hiddenPostsCount: 6,
      visiblePostsCount: 66,
      followersCount: 1840,
      score: 62874,
    },
    content: {
      about:
        "Subsocial is an open protocol for decentralized social networks and marketplaces. It's built with Substrate and IPFS. [Learn more](https://subsocial.network/)",
      handle: 'subsocial',
      image: 'Qmasp4JHhQWPkEpXLHFhMAQieAH1wtfVRNHWZ5snhfFeBe',
      links: [
        'https://subsocial.network',
        'https://twitter.com/SubsocialChain',
        'https://medium.com/dappforce',
        'https://t.me/Subsocial',
        'https://github.com/dappforce',
        'https://www.youtube.com/channel/UC1xCFynfwMrjEtFdMf8nXgQ',
      ],
      name: 'Subsocial',
      tags: ['subsocial', 'polkadot', 'substrate', 'sofi', 'chain', 'ipfs'],
      summary:
        "Subsocial is an open protocol for decentralized social networks and marketplaces. It's built with Substrate and IPFS. Learn more",
      isShowMore: false,
      email: '',
    },
  },
};
