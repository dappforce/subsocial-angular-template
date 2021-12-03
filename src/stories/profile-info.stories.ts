import { Meta, Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { SharedModule } from '../app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { ProfileInfoComponent } from '../app/ui-lib/profile/profile-info/profile-info.component';
import { ProfileModule } from '../app/ui-lib/profile/profile.module';
import { DeviceService } from '../app/shared/services/device.service';
import { APP_INITIALIZER } from '@angular/core';
import { Subject } from 'rxjs';
import { MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { IconRegistryService } from '../app/shared/services/icon-registry.service';
import { registryIcons } from '../app/app.module';

function initDeviceService(deviceService: DeviceService) {
  return () => deviceService.init();
}

export default {
  title: 'Account/Profile Info',
  component: ProfileInfoComponent,
  argTypes: {},
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        CommonModule,
        ProfileModule,
        HttpClientModule,
        MatDialogModule,
        RouterModule.forRoot([]),
        BrowserAnimationsModule,
        MatSnackBarModule,
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        {
          provide: APP_INITIALIZER,
          useFactory: initDeviceService,
          multi: true,
          deps: [DeviceService],
        },
        IconRegistryService,
        {
          provide: APP_INITIALIZER,
          useFactory: registryIcons,
          deps: [IconRegistryService],
          multi: true,
        },
      ],
    }),
  ],
} as Meta;
const unsubscribe$: Subject<void> = new Subject();
const modalConfig: MatDialogConfig = {};

const Template: Story<ProfileInfoComponent> = (args: ProfileInfoComponent) => ({
  props: {
    ...args,
    unsubscribe$,
    modalConfig,
  },
});

export const ProfileInfo = Template.bind({});

ProfileInfo.args = {
  avatarSrc: 'Qmasp4JHhQWPkEpXLHFhMAQieAH1wtfVRNHWZ5snhfFeBe',
  profileName: 'Subsocial',
  followingCount: 732,
  followersCount: 12,
};
