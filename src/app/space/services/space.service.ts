import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SubsocialApiService } from '../../shared/services/subsocial-api.service';
import { SpaceId } from '@subsocial/types/substrate/interfaces';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/state';
import { METHODS, PALLETS } from '../../core/constants/query.const';
import { ConvertService } from '../../shared/services/convert.service';
import { StoreService } from '../../store/store.service';
import { BehaviorSubject } from 'rxjs';
import { AccountService } from '../../shared/services/account.service';
import { mapSpaceDTOToSpace } from '../../core/mapper/space.map';
import { Space } from '../../store/space/space.state';
import { SpaceStruct } from '@subsocial/types/dto';

@Injectable({
  providedIn: 'root',
})
export class SpaceService {
  constructor(
    private http: HttpClient,
    private apiService: SubsocialApiService,
    private store: Store<AppState>,
    private convert: ConvertService,
    private storeService: StoreService,
    private accountService: AccountService
  ) {}

  private myOwnSpaceIdsSource = new BehaviorSubject<string[] | null>(null);
  myOwnSpaceIds$ = this.myOwnSpaceIdsSource.asObservable();

  public async getSpacesByIds(ids: string[]): Promise<SpaceStruct[]> {
    return await this.apiService.api.findSpaceStructs(ids);
  }

  public async getMyOwnSpaceIds() {
    const accountId = this.accountService.getCurrentAccountId();
    if (accountId) {
      const ids = await this.getSpaceIdsByAccount(accountId);

      if (ids?.length > 0) {
        this.myOwnSpaceIdsSource.next(ids);
        return;
      }
    }

    this.myOwnSpaceIdsSource.next(null);
  }

  public async loadSpacesByIds(
    ids: string[],
    type: 'public' | 'all' = 'public'
  ): Promise<Space[]> {
    const spaceData = await this.apiService.api.findPublicSpaces(ids);

    if (type === 'public') {
      const unlistedSpaces = await this.apiService.api.findUnlistedSpaces(ids);
      spaceData.push(...unlistedSpaces);
    }

    return spaceData.map((data) => mapSpaceDTOToSpace(data));
  }

  async getSpaceIdByHandle(handle: string): Promise<string | undefined> {
    const res: SpaceId | undefined =
      await this.apiService.api.subsocial.substrate.getSpaceIdByHandle(
        handle.toLowerCase()
      );

    return res?.toString();
  }

  async loadSpaceById(id: string) {
    const spaceData = await this.apiService.api.findSpace({
      id: this.convert.idToBn(id),
    });

    return spaceData ? mapSpaceDTOToSpace(spaceData) : undefined;
  }

  async getFollowersIdsBySpaceId(id: string) {
    return await this.apiService.getSubstrateIdsById({
      pallet: PALLETS.spaceFollows,
      method: METHODS.spaceFollowers,
      id,
    });
  }

  async getSpaceIdsByAccount(id: string) {
    const spaceId =
      await this.apiService.api.subsocial.substrate.spaceIdsByOwner(id);
    return spaceId.map((id) => id.toString());
  }
}
