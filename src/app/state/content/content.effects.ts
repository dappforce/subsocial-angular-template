import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ContentAction from '../content/content.actions';
import { map } from 'rxjs/operators';

@Injectable()
export class ContentEffects {
  constructor(private action$: Actions) {}

  saveContents$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(ContentAction.saveContents),
        map((payload) => ContentAction.upsertContents(payload))
      ),
    { dispatch: false }
  );

  saveContent$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(ContentAction.saveContent),
        map((payload) => ContentAction.upsertContent(payload))
      ),
    { dispatch: false }
  );
}
