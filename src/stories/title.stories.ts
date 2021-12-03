import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { TitleComponent } from '../app/ui-lib/text/title/title.component';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { TextModule } from '../app/ui-lib/text/text.module';

export default {
  title: 'Shared/Title',
  component: TitleComponent,
  argTypes: {},
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [TextModule, RouterModule.forRoot([])],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
    }),
  ],
} as Meta;

const Template: Story<TitleComponent> = (args: TitleComponent) => ({
  props: args,
});

export const Title = Template.bind({});
Title.args = {
  type: 'medium',
  text: 'Anonouncing The Subsocial Spacers Program 2.0',
};
