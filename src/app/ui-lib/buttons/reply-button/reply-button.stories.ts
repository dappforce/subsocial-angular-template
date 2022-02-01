import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { ButtonsModule } from '../buttons.module';
import { HttpClientModule } from '@angular/common/http';
import { IconRegistryProviders } from '../../../core/constants/storybook.const';
import { TranslocoRootModule } from '../../../transloco-root.module';
import { ReplyButtonComponent } from './reply-button.component';

export default {
  title: 'Buttons/Reply Button',
  component: ReplyButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [ButtonsModule, HttpClientModule, TranslocoRootModule],
      declarations: [],
      providers: [...IconRegistryProviders],
    }),
  ],
} as Meta;

const Template: Story<ReplyButtonComponent> = (args: ReplyButtonComponent) => ({
  component: ReplyButtonComponent,
  props: args,
});

export const ReplyButton: Story<ReplyButtonComponent> = Template.bind({});
ReplyButton.args = {
  isShowLabel: true,
};
