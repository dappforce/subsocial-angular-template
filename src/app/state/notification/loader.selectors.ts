import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LoaderState } from './loader.state';

export const selectLoader = createFeatureSelector<LoaderState>('loader');

export const selectLoaderStatus = createSelector(
  selectLoader,
  (loader) => loader.isLoading
);
