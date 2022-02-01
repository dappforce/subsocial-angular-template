import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { ButtonsModule } from '../buttons.module';
import { HttpClientModule } from '@angular/common/http';
import {
  IconRegistryProviders,
  SbRouterModule,
} from '../../../core/constants/storybook.const';
import { EditButtonComponent } from './edit-button.component';

export default {
  title: 'Buttons/Edit Button',
  component: EditButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [ButtonsModule, HttpClientModule, SbRouterModule],
      declarations: [],
      providers: [...IconRegistryProviders],
    }),
  ],
} as Meta;

const Template: Story<EditButtonComponent> = (args: EditButtonComponent) => ({
  component: EditButtonComponent,
  props: args,
});

export const EditButton: Story<EditButtonComponent> = Template.bind({});
EditButton.args = {};
