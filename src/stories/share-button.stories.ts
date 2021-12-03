import { Meta, Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { IconRegistryService } from '../app/shared/services/icon-registry.service';
import { APP_INITIALIZER } from '@angular/core';
import { registryIcons } from '../app/app.module';
import { SharedModule } from '../app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { SharedButtonComponent } from '../app/ui-lib/buttons/shared-button/shared-button.component';
import { ButtonsModule } from '../app/ui-lib/buttons/buttons.module';

export default {
  title: 'Buttons/Share Button',
  component: SharedButtonComponent,
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

const Template: Story<SharedButtonComponent> = (
  args: SharedButtonComponent
) => ({
  props: args,
});

export const ShareButton = Template.bind({});
ShareButton.args = {};
