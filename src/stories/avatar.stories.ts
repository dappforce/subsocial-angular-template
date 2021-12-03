import { Story, Meta } from '@storybook/angular/types-6-0';
import { AvatarComponent } from '../app/ui-lib/avatar/avatar.component';
import { moduleMetadata } from '@storybook/angular';
import { HttpClientModule } from '@angular/common/http';
// @ts-ignore
import { SharedModule } from '../app/shared/shared.module';
import { AvatarModule } from '../app/ui-lib/avatar/avatar.module';
import { environment } from '../environments/environment';

export default {
  title: 'Shared/Avatar',
  component: AvatarComponent,
  argTypes: {
    size: { control: 'number' },
  },
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [AvatarModule, HttpClientModule],
    }),
  ],
} as Meta;

const Template: Story<AvatarComponent> = (args: AvatarComponent) => ({
  props: args,
});

export const AvatarWithImage = Template.bind({});
AvatarWithImage.args = {
  url: environment.ipfsUrl + 'Qmasp4JHhQWPkEpXLHFhMAQieAH1wtfVRNHWZ5snhfFeBe',
  src: 'Qmasp4JHhQWPkEpXLHFhMAQieAH1wtfVRNHWZ5snhfFeBe',
};

export const AvatarWithoutImage = Template.bind({});
AvatarWithoutImage.args = {
  name: 'Savannah Nguyen',
  showJdentity: true,
  url: '',
  src: '',
};
