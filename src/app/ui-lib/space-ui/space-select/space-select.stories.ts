import {
  componentWrapperDecorator,
  Meta,
  moduleMetadata,
  Story,
} from '@storybook/angular';
import { HttpClientModule } from '@angular/common/http';
import { TranslocoRootModule } from '../../../transloco-root.module';
import { MatIconModule } from '@angular/material/icon';
import {
  IconRegistryProviders,
  SbDeviceRegistry,
  SbRouterModule,
  SbStoreModules,
  SpaceTemplate,
} from '../../../core/constants/storybook.const';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SpaceUiModule } from '../space-ui.module';
import { MatDialogModule } from '@angular/material/dialog';
import { of } from 'rxjs';
import { SpaceSelectComponent } from './space-select.component';

export default {
  title: 'Space/Space Select',
  component: SpaceSelectComponent,
  decorators: [
    moduleMetadata({
      imports: [
        MatSnackBarModule,
        HttpClientModule,
        TranslocoRootModule,
        MatDialogModule,
        MatIconModule,
        SbRouterModule,
        SbStoreModules,
        SpaceUiModule,
      ],
      declarations: [],
      providers: [...IconRegistryProviders, ...SbDeviceRegistry],
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

const params = {
  controls: {
    include: ['spaces', 'selectedSpace', 'isShowSpaceList'],
  },
};

const Template: Story<SpaceSelectComponent> = (args: SpaceSelectComponent) => ({
  component: SpaceSelectComponent,
  props: args,
});

const spaces = new Array(5).fill(null).map((_, i) => {
  const space = JSON.parse(JSON.stringify(SpaceTemplate));
  const index = (i + 1).toString();
  space.id = index;
  space.name = space.name + ' ' + index;
  return space;
});

export const SpaceSelect: Story<SpaceSelectComponent> = Template.bind({});
SpaceSelect.args = {
  spaces,
  selectedSpace: spaces[0],
};

SpaceSelect.parameters = params;
