import { Story, Meta } from '@storybook/angular/types-6-0';
import { componentWrapperDecorator, moduleMetadata } from '@storybook/angular';
import { HttpClientModule } from '@angular/common/http';
import { IconRegistryService } from '../app/shared/services/icon-registry.service';
import { APP_INITIALIZER } from '@angular/core';
import { registryIcons } from '../app/app.module';
import { VoteUserListItemComponent } from '../app/shared/components/vote-user-list-item/vote-user-list-item.component';
import { SharedModule } from '../app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { PipesModule } from '../app/shared/pipes/pipes.module';

export default {
  title: 'Shared/Vote User List Item',
  component: VoteUserListItemComponent,
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
      imports: [SharedModule, HttpClientModule, RouterModule.forRoot([])],
    }),
    componentWrapperDecorator((story) => {
      return `<div style="max-width: 500px; background-color: white; padding: 0 16px">
            ${story}
        </div>`;
    }),
  ],
} as Meta;

const Template: Story<VoteUserListItemComponent> = (
  args: VoteUserListItemComponent
) => ({
  props: args,
});

export const VoteUserListItem = Template.bind({});
VoteUserListItem.args = {
  userInfo: {
    id: '',
    userName: 'Savannah Nguyen',
    avatarSrc: 'Qmasp4JHhQWPkEpXLHFhMAQieAH1wtfVRNHWZ5snhfFeBe',
    address: '5H9VtZCcLbxdfawD8n8N23ox4juj3RsbmAgge3mkLZGdT72H',
    isFollowing: false,
  },
  showCopyButton: true,
};
