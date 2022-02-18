import { Action, createReducer, on } from '@ngrx/store';
import { setMyAccount } from './my-account.actions';
import { initialMyAccountState, MyAccountState } from './my-account.state';

const myAccountReducers = createReducer(
  initialMyAccountState,
  on(setMyAccount, (state, { payload }) => {
    return { ...payload };
  })
);

export function myAccountReducer(
  state: MyAccountState | undefined,
  action: Action
) {
  return myAccountReducers(state, action);
}
