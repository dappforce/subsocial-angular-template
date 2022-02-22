import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { ButtonsModule } from '../buttons/buttons.module';
import { IconRegistryProviders } from '../../core/constants/storybook.const';
import { AvatarComponent } from './avatar.component';
import { AvatarModule } from './avatar.module';
import { NgxJdenticonModule } from 'ngx-jdenticon';

export default {
  title: 'Shared/Avatar',
  component: AvatarComponent,
  decorators: [
    moduleMetadata({
      imports: [
        MatSnackBarModule,
        HttpClientModule,
        ButtonsModule,
        AvatarModule,
        NgxJdenticonModule,
      ],
      declarations: [],
      providers: [...IconRegistryProviders],
    }),
  ],
} as Meta;

const Template: Story<AvatarComponent> = (args: AvatarComponent) => ({
  component: AvatarComponent,
  props: args,
});

export const Image: Story<AvatarComponent> = Template.bind({});
Image.args = {
  name: 'Subsocial User',
  url: 'https://app.subsocial.network/ipfs/ipfs/Qmasp4JHhQWPkEpXLHFhMAQieAH1wtfVRNHWZ5snhfFeBe',
};

export const WithoutImage: Story<AvatarComponent> = Template.bind({});
WithoutImage.args = {
  name: 'Subsocial User',
  jdentityValue: '3t8GGfcxxXiTUmGiTKp2jS611wucGs4K7zvr2UmXrawoWYLD',
  showJdentity: true,
};
