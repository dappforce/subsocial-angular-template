import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { ButtonsModule } from '../buttons.module';
import { HttpClientModule } from '@angular/common/http';
import {
  DISABLE_ARG,
  IconRegistryProviders,
} from '../../../core/constants/storybook.const';
import { NotificationIconButtonComponent } from './notification-icon-button.component';
import { of } from 'rxjs';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RouterModule } from '@angular/router';

export default {
  title: 'Buttons/Notification Button',
  component: NotificationIconButtonComponent,
  argTypes: {
    notificationCount$: DISABLE_ARG,
    currentAccount$: DISABLE_ARG,
  },
  decorators: [
    moduleMetadata({
      imports: [
        ButtonsModule,
        HttpClientModule,
        MatSnackBarModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        RouterModule.forRoot([], { useHash: true }),
      ],
      declarations: [],
      providers: [...IconRegistryProviders],
    }),
  ],
} as Meta;

const Template: Story<NotificationIconButtonComponent> = (
  args: NotificationIconButtonComponent
) => ({
  component: NotificationIconButtonComponent,
  props: args,
});

export const NotificationButton: Story<NotificationIconButtonComponent> =
  Template.bind({});
NotificationButton.args = {
  notificationCount$: of(10),
  currentAccount$: of({ name: '', id: '', avatar: '', balance: '' }),
};
