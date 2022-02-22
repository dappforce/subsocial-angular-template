import { CloseButtonComponent } from './close-button.component';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { ButtonsModule } from '../buttons.module';
import { HttpClientModule } from '@angular/common/http';
import { IconRegistryProviders } from '../../../core/constants/storybook.const';

export default {
  title: 'Buttons/Close Button',
  component: CloseButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [ButtonsModule, HttpClientModule],
      declarations: [],
      providers: [...IconRegistryProviders],
    }),
  ],
} as Meta;

const Template: Story<CloseButtonComponent> = (args: CloseButtonComponent) => ({
  component: CloseButtonComponent,
  props: args,
});

export const CloseButton: Story<CloseButtonComponent> = Template.bind({});
CloseButton.args = {};
