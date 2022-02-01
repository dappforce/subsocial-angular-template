import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { ButtonsModule } from '../buttons.module';
import { HttpClientModule } from '@angular/common/http';
import { IconRegistryProviders } from '../../../core/constants/storybook.const';
import { CreateSpaceButtonComponent } from './create-space-button.component';
import { RouterModule } from '@angular/router';
import { TranslocoRootModule } from '../../../transloco-root.module';

export default {
  title: 'Buttons/Create Space Button',
  component: CreateSpaceButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [
        ButtonsModule,
        HttpClientModule,
        RouterModule.forRoot([], { useHash: true }),
        TranslocoRootModule,
      ],
      declarations: [],
      providers: [...IconRegistryProviders],
    }),
  ],
} as Meta;

const Template: Story<CreateSpaceButtonComponent> = (
  args: CreateSpaceButtonComponent
) => ({
  component: CreateSpaceButtonComponent,
  props: args,
});

export const CreateSpaceButton: Story<CreateSpaceButtonComponent> =
  Template.bind({});
CreateSpaceButton.args = {};
