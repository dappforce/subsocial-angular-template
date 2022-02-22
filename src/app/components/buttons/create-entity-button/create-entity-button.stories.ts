import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { ButtonsModule } from '../buttons.module';
import { CreateEntityButtonComponent } from './create-entity-button.component';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { BaseRef, DISABLE_ARG } from '../../../core/constants/storybook.const';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { I18NextModule } from 'angular-i18next';
import { Subscription } from 'rxjs';
import { I18N_PROVIDERS } from '../../../locale/i18next.config';

export default {
  title: 'Buttons/Create Entity Button',
  component: CreateEntityButtonComponent,
  argTypes: {
    type: {
      options: ['space', 'post', null],
      control: {
        type: 'select',
        labels: {
          Post: 'post',
          Space: 'space',
          None: null,
        },
      },
    },
    subscription: DISABLE_ARG,
  },
  decorators: [
    moduleMetadata({
      imports: [
        ButtonsModule,
        MatDialogModule,
        RouterModule.forRoot([], { useHash: true }),
        HttpClientModule,
        MatSnackBarModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        I18NextModule.forRoot(),
      ],
      declarations: [],
      providers: [BaseRef, ...I18N_PROVIDERS],
    }),
  ],
} as Meta;

const Template: Story<CreateEntityButtonComponent> = (
  args: CreateEntityButtonComponent
) => ({
  component: CreateEntityButtonComponent,
  props: args,
});

const subscription = new Subscription();

export const CreateEntityButton: Story<CreateEntityButtonComponent> =
  Template.bind({});
CreateEntityButton.args = {
  type: 'space',
  subscription,
};
