import { Injectable } from '@angular/core';
import { SubsocialApiService } from './subsocial-api.service';
import { CanHaveContent } from '@subsocial/api/flat-subsocial/flatteners';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  constructor(private apiService: SubsocialApiService) {}

  public async getEntityContentArray(entity: Array<CanHaveContent>) {
    const ids: string[] = entity
      .filter((e) => e.contentId !== undefined)
      .map((e) => e.contentId!);
    return await this.apiService.getContentArray(ids);
  }
}
