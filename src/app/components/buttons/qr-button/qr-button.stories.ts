import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { ButtonsModule } from '../buttons.module';
import { HttpClientModule } from '@angular/common/http';
import {
  DISABLE_ARG,
  IconRegistryProviders,
} from '../../../core/constants/storybook.const';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { QrButtonComponent } from './qr-button.component';
import { MatDialogModule } from '@angular/material/dialog';

export default {
  title: 'Buttons/Qr Button',
  component: QrButtonComponent,
  argTypes: {},
  decorators: [
    moduleMetadata({
      imports: [
        ButtonsModule,
        HttpClientModule,
        MatDialogModule,
        MatSnackBarModule,
      ],
      declarations: [],
      providers: [...IconRegistryProviders],
    }),
  ],
} as Meta;

const Template: Story<QrButtonComponent> = (args: QrButtonComponent) => ({
  component: QrButtonComponent,
  props: args,
});

export const QrButton: Story<QrButtonComponent> = Template.bind({});
QrButton.args = {
  address: '',
};
