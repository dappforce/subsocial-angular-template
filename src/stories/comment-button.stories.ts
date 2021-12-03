import { Meta, Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { IconRegistryService } from '../app/shared/services/icon-registry.service';
import { APP_INITIALIZER } from '@angular/core';
import { registryIcons } from '../app/app.module';
import { HttpClientModule } from '@angular/common/http';
import { CommentButtonComponent } from '../app/ui-lib/buttons/comment-button/comment-button.component';
import { ButtonsModule } from '../app/ui-lib/buttons/buttons.module';

export default {
  title: 'Buttons/Comment Button',
  component: CommentButtonComponent,
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

const Template: Story<CommentButtonComponent> = (
  args: CommentButtonComponent
) => ({
  props: args,
});

export const CommentButton = Template.bind({});
CommentButton.args = {
  count: 5,
};
