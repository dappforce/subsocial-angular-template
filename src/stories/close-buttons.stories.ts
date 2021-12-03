import { Meta, Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { IconRegistryService } from '../app/shared/services/icon-registry.service';
import { APP_INITIALIZER } from '@angular/core';
import { registryIcons } from '../app/app.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { ButtonsModule } from '../app/ui-lib/buttons/buttons.module';
import { CloseButtonComponent } from '../app/ui-lib/buttons/close-button/close-button.component';

export default {
  title: 'Buttons/Close Button',
  component: CloseButtonComponent,
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
        { provide: APP_BASE_HREF, useValue: '/' },
      ],
      declarations: [],
      imports: [RouterModule.forRoot([]), ButtonsModule, HttpClientModule],
    }),
  ],
} as Meta;

const Template: Story<CloseButtonComponent> = (args: CloseButtonComponent) => ({
  props: args,
});

export const CloseButton = Template.bind({});
CloseButton.args = {};
