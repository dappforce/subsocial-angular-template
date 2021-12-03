import { Meta, Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { SharedModule } from '../app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { IconRegistryService } from '../app/shared/services/icon-registry.service';
import { APP_INITIALIZER } from '@angular/core';
import { registryIcons } from '../app/app.module';
import { UpvoteButtonComponent } from '../app/ui-lib/buttons/upvote-button/upvote-button.component';
import { ButtonsModule } from "../app/ui-lib/buttons/buttons.module";

export default {
  title: 'Buttons/Vote Buttons',
  component: UpvoteButtonComponent,
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

const Template: Story<UpvoteButtonComponent> = (
  args: UpvoteButtonComponent
) => ({
  props: args,
});

export const Upvote = Template.bind({});
Upvote.args = {
  isActive: false,
  isShowLabel: false,
  count: 1232,
};

