import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { HttpClientModule } from '@angular/common/http';
import { IconRegistryProviders } from '../../core/constants/storybook.const';
import { AddressComponent } from './address.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PipesModule } from '../../shared/pipes/pipes.module';
import { MatIconModule } from '@angular/material/icon';
import { ButtonsModule } from '../buttons/buttons.module';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { I18N_PROVIDERS } from '../../locale/i18next.config';
import { I18NextModule } from 'angular-i18next';

export default {
  title: 'Shared/Address',
  component: AddressComponent,
  decorators: [
    moduleMetadata({
      imports: [
        MatSnackBarModule,
        HttpClientModule,
        PipesModule,
        MatIconModule,
        ButtonsModule,
        ClipboardModule,
        I18NextModule.forRoot(),
      ],
      declarations: [],
      providers: [...IconRegistryProviders, ...I18N_PROVIDERS],
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
