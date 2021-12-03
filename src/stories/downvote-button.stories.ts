import { Meta, Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { SharedModule } from '../app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { IconRegistryService } from '../app/shared/services/icon-registry.service';
import { APP_INITIALIZER } from '@angular/core';
import { registryIcons } from '../app/app.module';
import { UpvoteButtonComponent } from '../app/ui-lib/buttons/upvote-button/upvote-button.component';
import { ButtonsModule } from '../app/ui-lib/buttons/buttons.module';
import { DownvoteButtonComponent } from '../app/ui-lib/buttons/downvote-button/downvote-button.component';

export default {
  title: 'Buttons/Vote Buttons',
  component: DownvoteButtonComponent,
  argTypes: {},
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
      ],
      declarations: [],
      imports: [ButtonsModule, HttpClientModule],
    }),
  ],
} as Meta;

const Template: Story<DownvoteButtonComponent> = (
  args: DownvoteButtonComponent
) => ({
  props: args,
});

export const Downvote = Template.bind({});
Downvote.args = {
  isActive: false,
  isShowLabel: false,
  count: 1232,
};
