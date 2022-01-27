import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { ButtonsModule } from '../buttons.module';
import { HttpClientModule } from '@angular/common/http';
import { IconRegistryProviders } from '../../../core/constants/storybook.const';
import { TranslocoRootModule } from '../../../transloco-root.module';
import { SharedButtonComponent } from './shared-button.component';

export default {
  title: 'Buttons/Shared Button',
  component: SharedButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [ButtonsModule, HttpClientModule, TranslocoRootModule],
      declarations: [],
      providers: [...IconRegistryProviders],
    }),
  ],
} as Meta;

const Template: Story<SharedButtonComponent> = (
  args: SharedButtonComponent
) => ({
  component: SharedButtonComponent,
  props: args,
});

export const Default: Story<SharedButtonComponent> = Template.bind({});
Default.args = {};

export const Label: Story<SharedButtonComponent> = Template.bind({});
Label.args = {
  isShowLabel: true,
};
