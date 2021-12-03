import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { newFlatSubsocialApi, SubsocialSubstrateApi } from '@subsocial/api';
import { environment } from '../../../environments/environment';
import { FlatSubsocialApi } from '@subsocial/api/flat-subsocial';
import { isPlatformBrowser } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AnyId } from '@subsocial/api/flat-subsocial/dto';
import { SnackBarService } from './snack-bar.service';
import { ConvertService } from './convert.service';
import BN from 'bn.js';

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

@Injectable({
  providedIn: 'root',
})
export class SubsocialApiService {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private _snackBar: MatSnackBar,
    private snackBarService: SnackBarService,
    private convert: ConvertService
  ) {}
  public api: FlatSubsocialApi;

  public get substrate() {
    return this.api.subsocial.substrate;
  }

  async initSubsocialApi() {
    const snackBar = this.snackBarService.openSimpleSnackBar({
      message: 'Connecting to network...',
      iconName: 'info-icon',
    });

    const { substrateNodeUrl, offchainUrl, ipfsNodeUrl } = environment;
    this.api = await newFlatSubsocialApi({
      substrateNodeUrl,
      offchainUrl,
      ipfsNodeUrl,
      useServer: {
        httpRequestMethod: 'get',
      },
    });

    snackBar.dismiss();
  }

  async getSubstrateIdsById(props: FetchSubstrateProps) {
    const readyApi = await this.api.subsocial.substrate.api;
    const { pallet, method, id } = props;
    const ids = await readyApi.query[pallet][method](id);
    return (ids.toJSON() as Array<any>).map((id) => id.toString());
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
