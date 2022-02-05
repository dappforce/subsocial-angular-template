import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { ButtonsModule } from '../buttons.module';
import { HttpClientModule } from '@angular/common/http';
import { IconRegistryProviders } from '../../../core/constants/storybook.const';
import { TranslocoRootModule } from '../../../transloco-root.module';
import { SendTipsButtonComponent } from './send-tips-button.component';
import { MatDialogModule } from '@angular/material/dialog';

export default {
  title: 'Buttons/Send Tips Button',
  component: SendTipsButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [
        ButtonsModule,
        HttpClientModule,
        TranslocoRootModule,
        MatDialogModule,
      ],
      declarations: [],
      providers: [...IconRegistryProviders],
    }),
  ],
} as Meta;

const Template: Story<SendTipsButtonComponent> = (
  args: SendTipsButtonComponent
) => ({
  component: SendTipsButtonComponent,
  props: args,
});

export const SendTipsButton: Story<SendTipsButtonComponent> = Template.bind({});
SendTipsButton.args = {};
