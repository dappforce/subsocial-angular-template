import {
  componentWrapperDecorator,
  Meta,
  moduleMetadata,
  Story,
} from '@storybook/angular';
import { ContainersModule } from '../containers.module';
import { RowComponent } from './row.component';

const control = {
  control: {
    type: 'select',
    options: ['start', 'end', 'center', 'normal', 'space-between'],
  },
};

export default {
  title: 'Containers/Row',
  component: RowComponent,
  argTypes: {
    alignItem: control,
    justifyContent: control,
  },
  decorators: [
    moduleMetadata({
      imports: [ContainersModule],
      declarations: [],
      providers: [],
    }),
    componentWrapperDecorator((story) => {
      return `
         <div class="sb-container" style="height: 100px">
            ${story}
        </div>`;
    }),
  ],
} as Meta;

const params = {
  controls: {
    include: ['alignItem', 'justifyContent', 'margin', 'padding', 'v', 'h'],
  },
};

const Template: Story<RowComponent> = (args: RowComponent) => ({
  component: RowComponent,
  props: args,
  template: `
    <app-row class="w100" style="height: 100%">
      <div>Element1</div>
      <div>Element2</div>
      <div>Element3</div>
    </app-row>`,
});

export const Row: Story<RowComponent> = Template.bind({});
Row.args = {
  alignItem: 'center',
  justifyContent: 'center',
};

Row.parameters = params;
