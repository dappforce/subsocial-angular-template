import { Meta, Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { IconRegistryService } from '../app/shared/services/icon-registry.service';
import { APP_INITIALIZER } from '@angular/core';
import { registryIcons } from '../app/app.module';
import { SharedModule } from '../app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { LinkIconsComponent } from '../app/shared/components/link-icons/link-icons.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

export default {
  title: 'Shared/Link Icons',
  component: LinkIconsComponent,
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
      imports: [
        CommonModule,
        SharedModule,
        HttpClientModule,
        BrowserAnimationsModule,
      ],
    }),
  ],
} as Meta;

const Template: Story<LinkIconsComponent> = (args: LinkIconsComponent) => ({
  props: args,
});

export const LinkIcons = Template.bind({});
LinkIcons.args = {
  links: [
    'https://test.com/',
    'https://twitter.com/test',
    'https://www.linkedin.com/in/test/',
    'https://t.me/test',
    'https://github.com/test',
    'https://medium.com/test',
    'https://www.youtube.com/channel/test',
    'https://www.reddit.com/user/Test',
  ],
};
