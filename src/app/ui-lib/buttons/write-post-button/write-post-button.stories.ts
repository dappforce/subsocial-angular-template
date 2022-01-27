import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { ButtonsModule } from '../buttons.module';
import { HttpClientModule } from '@angular/common/http';
import {
  IconRegistryProviders,
  SbRouterModule,
} from '../../../core/constants/storybook.const';
import { WritePostButtonComponent } from './write-post-button.component';
import { TranslocoRootModule } from '../../../transloco-root.module';

export default {
  title: 'Buttons/Write Post Button',
  component: WritePostButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [
        ButtonsModule,
        HttpClientModule,
        SbRouterModule,
        TranslocoRootModule,
      ],
      declarations: [],
      providers: [...IconRegistryProviders],
    }),
  ],
} as Meta;

const Template: Story<WritePostButtonComponent> = (
  args: WritePostButtonComponent
) => ({
  component: WritePostButtonComponent,
  props: args,
});

export const WritePostButton: Story<WritePostButtonComponent> = Template.bind(
  {}
);
WritePostButton.args = {};
