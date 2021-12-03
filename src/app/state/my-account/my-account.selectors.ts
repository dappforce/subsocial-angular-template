import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MyAccountState } from './my-account.state';

export const selectMyAccount =
  createFeatureSelector<MyAccountState>('myAccount');

export const selectMyAccountAddress = createSelector(
  selectMyAccount,
  (myAccount) => {
    return myAccount.address;
  }
);
