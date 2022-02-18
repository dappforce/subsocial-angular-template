import {
  componentWrapperDecorator,
  Meta,
  moduleMetadata,
  Story,
} from '@storybook/angular';
import { TextModule } from '../text.module';
import { SbRouterModule } from '../../../core/constants/storybook.const';
import { I18NextModule } from 'angular-i18next';
import { HttpClientModule } from '@angular/common/http';
import { SeeMoreComponent } from './see-more.component';
import { I18N_PROVIDERS } from '../../../locale/i18next.config';

export default {
  title: 'Text/See More',
  component: SeeMoreComponent,
  decorators: [
    moduleMetadata({
      imports: [
        TextModule,
        SbRouterModule,
        I18NextModule.forRoot(),
        HttpClientModule,
      ],
      declarations: [],
      providers: [...I18N_PROVIDERS],
    }),
    componentWrapperDecorator((story) => {
      return `
      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap" rel="stylesheet">
      <div class="sb-container">
            ${story}
        </div>`;
    }),
  ],
} as Meta;

const Template: Story<SeeMoreComponent> = (args: SeeMoreComponent) => ({
  component: SeeMoreComponent,
  props: args,
});

export const SeeMore: Story<SeeMoreComponent> = Template.bind({});
SeeMore.args = {};
