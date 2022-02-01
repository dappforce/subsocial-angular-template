import {
  componentWrapperDecorator,
  Meta,
  moduleMetadata,
  Story,
} from '@storybook/angular';

import {
  IconRegistryProviders,
  SbRouterModule,
} from '../../../core/constants/storybook.const';
import { HttpClientModule } from '@angular/common/http';
import { TranslocoRootModule } from '../../../transloco-root.module';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PostInfoComponent } from './post-info.component';
import { PostUiModule } from '../post-ui.module';

export default {
  title: 'Post/Post Info',
  component: PostInfoComponent,
  decorators: [
    moduleMetadata({
      imports: [
        HttpClientModule,
        PostUiModule,
        TranslocoRootModule,
        MatIconModule,
        BrowserAnimationsModule,
        SbRouterModule,
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

const Template: Story<PostInfoComponent> = (args: PostInfoComponent) => ({
  component: PostInfoComponent,
  props: args,
});

export const PostInfo: Story<PostInfoComponent> = Template.bind({});
PostInfo.args = {
  imageUrl: '3t8GGfcxxXiTUmGiTKp2jS611wucGs4K7zvr2UmXrawoWYLD',
  userName: 'Subsocial User',
  spaceName: 'Subsocial',
  createdAtTime: 1643042184000,
  ownerId: '3t8GGfcxxXiTUmGiTKp2jS611wucGs4K7zvr2UmXrawoWYLD',
  spaceLink: '',
  postLink: '',
};
