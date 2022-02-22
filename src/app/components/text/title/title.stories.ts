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
import { TitleComponent } from './title.component';

export default {
  title: 'Text/Title',
  component: TitleComponent,
  decorators: [
    moduleMetadata({
      imports: [TextModule, SbRouterModule, I18NextModule, HttpClientModule],
      declarations: [],
      providers: [],
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

const Template: Story<TitleComponent> = (args: TitleComponent) => ({
  component: TitleComponent,
  props: args,
});

export const Title: Story<TitleComponent> = Template.bind({});
Title.args = {
  text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
};
