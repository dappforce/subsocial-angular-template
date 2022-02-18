import {
  componentWrapperDecorator,
  Meta,
  moduleMetadata,
  Story,
} from '@storybook/angular';
import { ContentModule } from '../content.module';
import { PostImageComponent } from './post-image.component';
import {
  DISABLE_ARG,
  imageUrl,
  SbRouterModule,
} from '../../../core/constants/storybook.const';
import { CommonModule } from '@angular/common';

export default {
  title: 'Content/Post Image',
  component: PostImageComponent,
  argTypes: {
    style: DISABLE_ARG,
  },
  decorators: [
    moduleMetadata({
      imports: [ContentModule, SbRouterModule, CommonModule],
      declarations: [],
      providers: [],
    }),
    componentWrapperDecorator((story) => {
      return `
        <div class="sb-container">
            ${story}
        </div>`;
    }),
  ],
} as Meta;

const Template: Story<PostImageComponent> = (args: PostImageComponent) => ({
  component: PostImageComponent,
  props: args,
});

export const PostImage: Story<PostImageComponent> = Template.bind({});
PostImage.args = {
  imageSrc: imageUrl,
  link: '',
  type: 'full',
  style: {
    backgroundImage: 'url(' + imageUrl + ')',
  },
};
