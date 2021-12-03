import { Meta, Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { SharedModule } from '../app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { WritePostButtonComponent } from '../app/ui-lib/buttons/write-post-button/write-post-button.component';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { ButtonsModule } from '../app/ui-lib/buttons/buttons.module';

export default {
  title: 'Buttons/Write Post Button',
  component: WritePostButtonComponent,
  argTypes: {},
  decorators: [
    moduleMetadata({
      declarations: [],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
      imports: [RouterModule.forRoot([]), ButtonsModule, HttpClientModule],
    }),
  ],
} as Meta;

const Template: Story<WritePostButtonComponent> = (
  args: WritePostButtonComponent
) => ({
  props: args,
});

export const WritePostButton = Template.bind({});
WritePostButton.args = {};
