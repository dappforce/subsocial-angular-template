import {
  componentWrapperDecorator,
  Meta,
  moduleMetadata,
  Story,
} from '@storybook/angular';
import { ButtonsModule } from '../buttons.module';
import { HttpClientModule } from '@angular/common/http';
import {
  IconRegistryProviders,
  SbStoreModules,
} from '../../../core/constants/storybook.const';
import { FollowButtonComponent } from './follow-button.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { I18NextModule } from 'angular-i18next';
import { I18N_PROVIDERS } from '../../../locale/i18next.config';

export default {
  title: 'Buttons/Follow Button',
  component: FollowButtonComponent,
  argTypes: {
    label: {
      options: ['follow', 'following'],
      control: {
        type: 'select',
        labels: {
          Follow: 'follow',
          Following: 'following',
        },
      },
    },
  },
  decorators: [
    moduleMetadata({
      imports: [
        ButtonsModule,
        HttpClientModule,
        MatSnackBarModule,
        SbStoreModules,
        MatDialogModule,
        I18NextModule.forRoot(),
      ],
      declarations: [],
      providers: [...IconRegistryProviders, ...I18N_PROVIDERS],
    }),
    componentWrapperDecorator((story) => {
      return `
                  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap" rel="stylesheet">
                  <div>
                        ${story}
                   </div>`;
    }),
  ],
} as Meta;

const params = {
  controls: { include: ['type', 'size', 'width', 'label', '_isFollow'] },
};

const Template: Story<FollowButtonComponent> = (
  args: FollowButtonComponent
) => ({
  component: FollowButtonComponent,
  props: args,
});

export const FollowButton: Story<FollowButtonComponent> = Template.bind({});
FollowButton.args = {
  label: 'follow',
  _isFollow: false,
};

FollowButton.parameters = params;

export const FollowingButton: Story<FollowButtonComponent> = Template.bind({});
FollowingButton.args = {
  label: 'following',
  _isFollow: true,
};

FollowingButton.parameters = params;
