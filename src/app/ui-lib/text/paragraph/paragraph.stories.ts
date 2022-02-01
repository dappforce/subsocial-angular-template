import {
  componentWrapperDecorator,
  Meta,
  moduleMetadata,
  Story,
} from '@storybook/angular';
import { TextModule } from '../text.module';
import { ParagraphComponent } from './paragraph.component';
import { SbRouterModule } from '../../../core/constants/storybook.const';
import { TranslocoRootModule } from '../../../transloco-root.module';
import { HttpClientModule } from '@angular/common/http';

export default {
  title: 'Text/Paragraph',
  component: ParagraphComponent,
  decorators: [
    moduleMetadata({
      imports: [
        TextModule,
        SbRouterModule,
        TranslocoRootModule,
        HttpClientModule,
      ],
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

const Template: Story<ParagraphComponent> = (args: ParagraphComponent) => ({
  component: ParagraphComponent,
  props: args,
});

export const Paragraph: Story<ParagraphComponent> = Template.bind({});
Paragraph.args = {
  text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
};
