import {
  componentWrapperDecorator,
  Meta,
  moduleMetadata,
  Story,
} from '@storybook/angular';
import { ColumnComponent } from './column.component';
import { ContainersModule } from '../containers.module';

const control = {
  control: {
    type: 'select',
    options: ['start', 'end', 'center', 'normal', 'space-between'],
  },
};

export default {
  title: 'Containers/Column',
  component: ColumnComponent,
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

const Template: Story<ColumnComponent> = (args: ColumnComponent) => ({
  component: ColumnComponent,
  props: args,
  template: `
    <app-column style="height: 100%">
      <div>Element1</div>
      <div>Element2</div>
      <div>Element3</div>
    </app-column>`,
});

export const Column: Story<ColumnComponent> = Template.bind({});
Column.args = {
  alignItem: 'center',
  justifyContent: 'center',
};

Column.parameters = params;
