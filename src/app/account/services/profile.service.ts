import { Injectable } from '@angular/core';
import { SubsocialApiService } from '../../shared/services/subsocial-api.service';
import { METHODS, PALLETS } from '../../core/constants/query.const';
import { ProfileStruct } from '@subsocial/api/flat-subsocial/flatteners';
import { Content } from '../../core/types/content.type';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private api: SubsocialApiService) {}

  async getFollowingIds(id: string) {
    return await this.api.getSubstrateIdsById({
      pallet: PALLETS.profileFollows,
      method: METHODS.accountsFollowedByAccount,
      id,
    });
  }

  async getFollowersIds(id: string) {
    return await this.api.getSubstrateIdsById({
      pallet: PALLETS.profileFollows,
      method: METHODS.accountFollowers,
      id,
    });
  }

  async getProfilesByIds(ids: string[]) {
    const profileData = await this.api.api.findProfiles(ids);
    const structs: ProfileStruct[] = [];
    const contents: Content[] = [];

    profileData.forEach((data) => {
      structs.push(data.struct);
      if (data.content && data.struct.contentId) {
        const content = data.content as Content;
        content['id'] = data.struct.contentId;
        contents.push(content);
      }
    });

    return { structs, contents };
  }
}
