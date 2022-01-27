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
import { TranslocoModule } from '@ngneat/transloco';
import { Subscription } from 'rxjs';
import { TranslocoRootModule } from '../../../transloco-root.module';

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
        TranslocoRootModule,
        TranslocoModule,
      ],
      declarations: [],
      providers: [BaseRef],
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
