import { createAction, props } from '@ngrx/store';

export const setLoader = createAction(
  '[Loader] Set Loader',
  props<{ isLoading: boolean }>()
);
