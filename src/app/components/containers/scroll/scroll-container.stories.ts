import { RowComponent } from '../row/row.component';
import {
  componentWrapperDecorator,
  Meta,
  moduleMetadata,
  Story,
} from '@storybook/angular';
import { ContainersModule } from '../containers.module';
import { ScrollComponent } from './scroll.component';

export default {
  title: 'Containers/Scroll Container',
  component: ScrollComponent,
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

const Template: Story<ScrollComponent> = (args: ScrollComponent) => ({
  component: ScrollComponent,
  props: args,
  template: `
    <app-scroll style="max-height: 95px; display: block;" class="w100">
      <div>Element1</div>
      <div>Element2</div>
      <div>Element3</div>
      <div>Element4</div>
      <div>Element5</div>
      <div>Element6</div>
      <div>Element7</div>
      <div>Element8</div>
      <div>Element9</div>
      <div>Element10</div>
    </app-scroll>`,
});

export const ScrollContainer: Story<ScrollComponent> = Template.bind({});
ScrollContainer.args = {
  _height: '50px',
};
