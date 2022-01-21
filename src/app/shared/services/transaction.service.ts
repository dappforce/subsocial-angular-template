import { Injectable } from '@angular/core';
import { SubsocialApiService } from './subsocial-api.service';
import { ExtrinsicProps } from '../../core/base-component/base-tx.component';
import { SnackBarService } from './snack-bar.service';
import { MESSAGES } from '../../core/constants/messages';
import { SimpleSnackBarComponent } from '../components/simple-snack-bar/simple-snack-bar.component';
import { MatSnackBarRef } from '@angular/material/snack-bar';
import { CommonContent } from '@subsocial/types';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

export type IpfsContentProps = {
  body?: string;
};

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  constructor(
    private api: SubsocialApiService,
    private snackBarService: SnackBarService,
    private http: HttpClient
  ) {}

  waitMessageRef: MatSnackBarRef<SimpleSnackBarComponent>;

  async getExtrinsic({ pallet, method, params }: ExtrinsicProps) {
    const api = await this.api.api.subsocial.substrate.api;
    if (!api.tx[pallet]) {
      throw new Error(`Unable to find api.tx.${pallet}`);
    } else if (!api.tx[pallet][method]) {
      throw new Error(`Unable to find api.tx.${pallet}.${method}`);
    }

    return api.tx[pallet][method](...params);
  }

  async saveIpfsContent(content: CommonContent) {
    try {
      const cid = await this.api.api.subsocial.ipfs.saveContent(content);
      if (cid) {
        return cid;
      } else {
        console.error('Save to IPFS returned an undefined CID');
      }
    } catch (err) {
      console.error(`Failed to build tx params. ${err}`);
    }
    return undefined;
  }

  async saveFile(file: File) {
    const { addFileUrl } = environment;

    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(addFileUrl, formData).toPromise();
  }

  async removeContent(cid: string) {
    try {
      await this.api.api.subsocial.ipfs.removeContent(cid);
    } catch (e) {
      console.error('Content not removed', e);
    }
  }

  showSuccessMessage(message: string) {
    this.snackBarService.openSimpleSnackBar({
      message,
      isShowCloseButton: true,
      duration: 2000,
    });
  }

  showErrorMessage(message: string) {
    this.snackBarService.showErrorMessage(message);
  }

  showWaitMessage() {
    this.waitMessageRef = this.snackBarService.openSimpleSnackBar({
      message: MESSAGES.WAITING_TX_COMPLETE,
      isWait: true,
    });
  }

  closeWaitMessage() {
    this.waitMessageRef.dismiss();
  }
}
