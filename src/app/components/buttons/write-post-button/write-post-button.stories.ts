import {
  componentWrapperDecorator,
  Meta,
  moduleMetadata,
  Story,
} from '@storybook/angular';
import { ButtonsModule } from '../buttons.module';
import { HttpClientModule } from '@angular/common/http';
import {
  IconRegistryProviders,
  SbRouterModule,
} from '../../../core/constants/storybook.const';
import { WritePostButtonComponent } from './write-post-button.component';
import { I18NextModule } from 'angular-i18next';
import { I18N_PROVIDERS } from '../../../locale/i18next.config';

export default {
  title: 'Buttons/Write Post Button',
  component: WritePostButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [
        ButtonsModule,
        HttpClientModule,
        SbRouterModule,
        I18NextModule.forRoot(),
      ],
      declarations: [],
      providers: [...IconRegistryProviders, ...I18N_PROVIDERS],
    }),
    componentWrapperDecorator((story) => {
      return `
                  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap" rel="stylesheet">
                  <div>
                        ${story}
                   </div>`;
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
