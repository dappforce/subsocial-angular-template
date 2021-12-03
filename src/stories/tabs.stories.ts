import { Story, Meta } from '@storybook/angular/types-6-0';
import { componentWrapperDecorator, moduleMetadata } from '@storybook/angular';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../app/shared/shared.module';
import { TabsComponent } from '../app/shared/components/tabs/tabs.component';

export default {
  title: 'Shared/Tabs',
  component: TabsComponent,
  argTypes: {
    tabLinks: {
      control: {
        type: 'array',
      },
    },
    activeLink: {
      options: ['posts', 'spaces'],
      control: {
        type: 'select',
      },
    },
  },
  decorators: [
    moduleMetadata({
      providers: [],
      imports: [
        SharedModule,
        RouterModule.forRoot([], { useHash: true }),
        HttpClientModule,
      ],
    }),
    componentWrapperDecorator((story) => {
      return `<div class="container" style="background-color: white; padding-bottom: 0">
            ${story}
        </div>`;
    }),
  ],
} as Meta;

const Template: Story<TabsComponent> = (args: TabsComponent) => ({
  props: args,
});

export const Tabs = Template.bind({});
Tabs.args = {
  activeLink: { tabName: 'posts' },
  tabLinks: [{ tabName: 'posts' }, { tabName: 'spaces' }],
};
