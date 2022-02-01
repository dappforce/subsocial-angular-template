import {
  componentWrapperDecorator,
  Meta,
  moduleMetadata,
  Story,
} from '@storybook/angular';
import { ContentModule } from '../content.module';
import {
  DISABLE_ARG,
  IconRegistryProviders,
  SbStoreModules,
} from '../../../core/constants/storybook.const';
import { HiddenContentComponent } from './hidden-content.component';
import { of } from 'rxjs';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslocoRootModule } from '../../../transloco-root.module';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';

export default {
  title: 'Content/Hidden Content',
  component: HiddenContentComponent,
  argTypes: {
    hidden$: DISABLE_ARG,
    spaceHidden$: DISABLE_ARG,
  },
  decorators: [
    moduleMetadata({
      imports: [
        ContentModule,
        SbStoreModules,
        MatSnackBarModule,
        TranslocoRootModule,
        HttpClientModule,
        MatDialogModule,
      ],
      declarations: [],
      providers: [...IconRegistryProviders],
    }),
    componentWrapperDecorator((story) => {
      return `
         <div class="sb-container" style="height: 100px">
            ${story}
        </div>`;
    }),
  ],
} as Meta;

const Template: Story<HiddenContentComponent> = (
  args: HiddenContentComponent
) => ({
  component: HiddenContentComponent,
  props: args,
});

const params = {
  controls: {
    include: ['hidden$', 'type', 'spaceHidden$'],
  },
};

export const HiddenPost: Story<HiddenContentComponent> = Template.bind({});
HiddenPost.args = {
  hidden$: of(true),
  type: 'post',
};

HiddenPost.parameters = params;

export const HiddenSpace: Story<HiddenContentComponent> = Template.bind({});
HiddenSpace.args = {
  hidden$: of(true),
  type: 'space',
};

HiddenSpace.parameters = params;

export const HiddenComment: Story<HiddenContentComponent> = Template.bind({});
HiddenComment.args = {
  hidden$: of(true),
  type: 'comment',
};

HiddenComment.parameters = params;

export const PostWithHiddenSpace: Story<HiddenContentComponent> = Template.bind(
  {}
);
PostWithHiddenSpace.args = {
  hidden$: of(true),
  type: 'comment',
  spaceHidden$: of(true),
};

PostWithHiddenSpace.parameters = params;
