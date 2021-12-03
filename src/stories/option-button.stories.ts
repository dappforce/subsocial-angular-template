import { Meta, Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { OptionButtonComponent } from '../app/ui-lib/buttons/option-button/option-button.component';
import { IconRegistryService } from '../app/shared/services/icon-registry.service';
import { APP_INITIALIZER } from '@angular/core';
import { registryIcons } from '../app/app.module';
import { HttpClientModule } from '@angular/common/http';
import { ButtonsModule } from '../app/ui-lib/buttons/buttons.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export default {
  title: 'Buttons/Option Button',
  component: OptionButtonComponent,
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
      imports: [BrowserAnimationsModule, ButtonsModule, HttpClientModule],
    }),
  ],
} as Meta;

const Template: Story<OptionButtonComponent> = (
  args: OptionButtonComponent
) => ({
  props: args,
});

export const OptionButton = Template.bind({});
OptionButton.args = {};
