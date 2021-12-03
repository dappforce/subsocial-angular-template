import { Meta, Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { IconRegistryService } from '../app/shared/services/icon-registry.service';
import { APP_INITIALIZER } from '@angular/core';
import { registryIcons } from '../app/app.module';
import { SharedModule } from '../app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { EditButtonComponent } from '../app/ui-lib/buttons/edit-button/edit-button.component';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { ButtonsModule } from '../app/ui-lib/buttons/buttons.module';

export default {
  title: 'Buttons/Edit Button',
  component: EditButtonComponent,
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

const Template: Story<EditButtonComponent> = (args: EditButtonComponent) => ({
  props: args,
});

export const EditButton = Template.bind({});
EditButton.args = {};
