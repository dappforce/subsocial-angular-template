import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { ContentService } from '../../shared/services/content.service';

@Injectable()
export class ContentEffects {
  constructor(
    private action$: Actions,
    private contentService: ContentService
  ) {}
}
