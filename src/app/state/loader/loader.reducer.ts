import { Action, createReducer, on } from '@ngrx/store';
import { initialLoaderState, LoaderState } from './loader.state';
import { setLoader } from './loader.actions';

const loaderReducers = createReducer(
  initialLoaderState,
  on(setLoader, (state, { isLoading }) => {
    return { ...state, isLoading };
  })
);

export function loaderReducer(state: LoaderState | undefined, action: Action) {
  return loaderReducers(state, action);
}
