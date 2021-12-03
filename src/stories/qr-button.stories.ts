import { Meta, Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { APP_INITIALIZER } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconRegistryService } from '../app/shared/services/icon-registry.service';
import { registryIcons } from '../app/app.module';
import { QrButtonComponent } from '../app/ui-lib/buttons/qr-button/qr-button.component';
import { ButtonsModule } from '../app/ui-lib/buttons/buttons.module';
import { SharedModule } from '../app/shared/shared.module';

export default {
  title: 'Buttons/Qr Button',
  component: QrButtonComponent,
  argTypes: {},
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        CommonModule,
        ButtonsModule,
        SharedModule,
        HttpClientModule,
        MatDialogModule,
        RouterModule.forRoot([]),
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
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

const Template: Story<QrButtonComponent> = (args: QrButtonComponent) => ({
  props: {
    ...args,
  },
});

export const QrButton = Template.bind({});

QrButton.args = {
  address: 'Qmasp4JHhQWPkEpXLHFhMAQieAH1wtfVRNHWZ5snhfFeBe',
};
