import { Injectable } from '@angular/core';
import { SubsocialApiService } from '../../shared/services/subsocial-api.service';
import { METHODS, PALLETS } from '../../core/constants/query.const';
import { mapProfileDTOToProfile } from '../../core/mapper/profile.map';

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

  async fetchProfilesByIds(ids: string[]) {
    const profilesData = await this.api.api.findProfiles(ids);
    return profilesData.map((profile) => mapProfileDTOToProfile(profile));
  }

  public async fetchProfileById(id: string) {
    const profileData = await this.api.api.findProfile(id);
    return mapProfileDTOToProfile(profileData, id);
  }
}
