import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { HttpClientModule } from '@angular/common/http';
import { IconRegistryService } from '../app/shared/services/icon-registry.service';
import { APP_INITIALIZER } from '@angular/core';
import { registryIcons } from '../app/app.module';
import { SharedModule } from '../app/shared/shared.module';
import { AddressComponent } from '../app/ui-lib/address/address.component';
import { AddressModule } from '../app/ui-lib/address/address.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';

export default {
  title: 'Shared/Address',
  component: AddressComponent,
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
      imports: [AddressModule, MatSnackBarModule, HttpClientModule],
    }),
  ],
} as Meta;

const Template: Story<AddressComponent> = (args: AddressComponent) => ({
  props: args,
});

export const Address = Template.bind({});
Address.args = {
  address: '5H9VtZCcLbxdfawD8n8N23ox4juj3RsbmAgge3mkLZGdT72H',
};
