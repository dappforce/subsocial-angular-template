import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { SeeMoreComponent } from '../app/ui-lib/text/see-more/see-more.component';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { TextModule } from '../app/ui-lib/text/text.module';

export default {
  title: 'Shared/See More',
  component: SeeMoreComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [TextModule, RouterModule.forRoot([])],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
    }),
  ],
} as Meta;

const Template: Story<SeeMoreComponent> = (args: SeeMoreComponent) => ({
  props: args,
});

export const SeeMore = Template.bind({});
SeeMore.args = {
  link: '',
};
