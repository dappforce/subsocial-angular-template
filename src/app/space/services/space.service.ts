import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SubsocialApiService } from '../../shared/services/subsocial-api.service';
import { SpaceStruct } from '@subsocial/api/flat-subsocial/flatteners';
import { SpaceData } from '@subsocial/api/flat-subsocial/dto';
import { Content } from '../../core/types/content.type';
import { SpaceId } from '@subsocial/types/substrate/interfaces';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/state';
import { selectSpaceById } from '../../state/space/space.selectors';
import {
  loadSpaceById,
  loadSpaceSuccess,
} from '../../state/space/space.actions';
import {
  TransformData,
  TransformDataArray,
} from '../../core/types/transform-dto.types';
import { transformEntityDataArray } from '../../core/utils';
import { METHODS, PALLETS } from '../../core/constants/query.const';
import { ConvertService } from '../../shared/services/convert.service';
import { StoreService } from '../../state/store.service';

@Injectable({
  providedIn: 'root',
})
export class SpaceService {
  constructor(
    private http: HttpClient,
    private apiService: SubsocialApiService,
    private store: Store<AppState>,
    private convert: ConvertService,
    private storeService: StoreService
  ) {}

  public async getSpacesByIds(ids: string[]): Promise<SpaceStruct[]> {
    return await this.apiService.api.findSpaceStructs(ids);
  }

  public async getFlatSpacesById(
    ids: string[],
    type: 'public' | 'all' = 'public'
  ): Promise<TransformDataArray> {
    const spaceData: SpaceData[] = await this.apiService.api.findPublicSpaces(
      ids
    );

    if (type === 'public') {
      const unlistedSpaces = await this.apiService.api.findUnlistedSpaces(ids);
      spaceData.push(...unlistedSpaces);
    }

    return transformEntityDataArray(spaceData);
  }

  async getSpaceIdByHandle(handle: string): Promise<string | undefined> {
    const res: SpaceId | undefined =
      await this.apiService.api.subsocial.substrate.getSpaceIdByHandle(
        handle.toLowerCase()
      );

    return res?.toString();
  }

  async getSpaceById(id: string) {
    const spaceData = await this.apiService.api.findSpace({
      id: this.convert.convertToBN(id),
    });
    if (spaceData && spaceData.struct.contentId) {
      const transformSpaceData: TransformData = {
        struct: spaceData!.struct,
        content: spaceData.content as Content,
      };
      transformSpaceData.content['id'] = spaceData.struct.contentId;

      return transformSpaceData;
    }

    return undefined;
  }

  async getFollowersIdsBySpaceId(id: string) {
    return await this.apiService.getSubstrateIdsById({
      pallet: PALLETS.spaceFollows,
      method: METHODS.spaceFollowers,
      id,
    });
  }

  async getOrFetchSpaceById(id: string | undefined) {
    return await this.storeService.getOrLoadEntities(
      selectSpaceById,
      loadSpaceById,
      loadSpaceSuccess,
      id,
      { id }
    );
  }

  async getSpaceIdsByAccount(id: string) {
    const spaceId =
      await this.apiService.api.subsocial.substrate.spaceIdsByOwner(id);
    return spaceId.map((id) => id.toString());
  }
}
