import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { HttpClientModule } from '@angular/common/http';
import { IconRegistryProviders } from '../../core/constants/storybook.const';
import { AddressComponent } from './address.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslocoRootModule } from '../../transloco-root.module';
import { PipesModule } from '../../shared/pipes/pipes.module';
import { MatIconModule } from '@angular/material/icon';
import { ButtonsModule } from '../buttons/buttons.module';
import { ClipboardModule } from '@angular/cdk/clipboard';

export default {
  title: 'Shared/Address',
  component: AddressComponent,
  decorators: [
    moduleMetadata({
      imports: [
        MatSnackBarModule,
        TranslocoRootModule,
        HttpClientModule,
        PipesModule,
        MatIconModule,
        ButtonsModule,
        ClipboardModule,
      ],
      declarations: [],
      providers: [...IconRegistryProviders],
    }),
  ],
} as Meta;

const Template: Story<AddressComponent> = (args: AddressComponent) => ({
  component: AddressComponent,
  props: args,
});

export const Address: Story<AddressComponent> = Template.bind({});
Address.args = {
  address: '3t8GGfcxxXiTUmGiTKp2jS611wucGs4K7zvr2UmXrawoWYLD',
};
