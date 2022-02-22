import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { ButtonsModule } from '../buttons.module';
import { IconButtonComponent } from './icon-button.component';
import { HttpClientModule } from '@angular/common/http';
import { IconRegistryProviders } from '../../../core/constants/storybook.const';

export default {
  title: 'Buttons/Icon Button',
  component: IconButtonComponent,
  argTypes: {
    iconName: {
      options: ['menu-icon', 'edit-icon'],
      control: {
        type: 'select',
        labels: {
          Menu: 'menu-icon',
          Edit: 'edit-icon',
        },
      },
    },
  },
  decorators: [
    moduleMetadata({
      imports: [ButtonsModule, HttpClientModule],
      declarations: [],
      providers: [...IconRegistryProviders],
    }),
  ],
} as Meta;

const Template: Story<IconButtonComponent> = (args: IconButtonComponent) => ({
  component: IconButtonComponent,
  props: args,
});

export const IconButton: Story<IconButtonComponent> = Template.bind({});
IconButton.args = {
  iconName: 'menu-icon',
};
