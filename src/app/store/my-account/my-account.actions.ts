import { createAction, props } from '@ngrx/store';
import { MyAccountState } from './my-account.state';

export const setMyAccount = createAction(
  '[My Account] Set My Account',
  props<{ payload: MyAccountState }>()
);
