import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { newFlatSubsocialApi } from '@subsocial/api';
import { environment } from '../../../environments/environment';
import { FlatSubsocialApi } from '@subsocial/api/flat-subsocial';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarService } from './snack-bar.service';
import { AnyId } from '@subsocial/types/dto';

type FetchSubstrateProps = {
  pallet: string;
  method: string;
  id: AnyId;
};

type FetchSubstrateMultiProps = {
  pallet: string;
  method: string;
  tuples: string[][];
};

type SubsocialMetadata = {
  token: string;
  decimals: number;
};

@Injectable({
  providedIn: 'root',
})
export class SubsocialApiService {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private _snackBar: MatSnackBar,
    private snackBarService: SnackBarService
  ) {}
  public api: FlatSubsocialApi;

  public metadata: SubsocialMetadata;

  public get substrate() {
    return this.api.subsocial.substrate;
  }

  async initSubsocialApi() {
    const snackBar = this.snackBarService.openSimpleSnackBar({
      message: 'Connecting to network...',
      iconName: 'info-icon',
      isShowCloseButton: true,
    });

    const { substrateNodeUrl, offchainUrl, ipfsNodeUrl } = environment;
    this.api = await newFlatSubsocialApi({
      offchainUrl,
      substrateNodeUrl,
      ipfsNodeUrl,
      useServer: {
        httpRequestMethod: 'get',
      },
    });

    const { registry } = await this.api.subsocial.substrate.api;
    this.metadata = {
      decimals: registry.chainDecimals[0],
      token: registry.chainTokens[0],
    };

    snackBar.dismiss();
  }

  async getSubstrateIdsById(props: FetchSubstrateProps) {
    const readyApi = await this.api?.subsocial.substrate.api;
    const { pallet, method, id } = props;
    const ids = await readyApi?.query[pallet][method](id);
    return (ids?.toJSON() as Array<any>).map((id) => id.toString()) || [];
  }

  async getSubstrateIdsByMulti(props: FetchSubstrateMultiProps) {
    const readyApi = await this.api.subsocial.substrate.api;
    const { pallet, method, tuples } = props;
    const ids = await readyApi.query[pallet][method].multi(tuples);
    return ids;
  }

  async getContentArray(ids: string[]) {
    return await this.api.subsocial.ipfs.getContentArray(ids);
  }
}
