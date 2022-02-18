import {
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Post } from '../../../core/models/post/post-list-item.model';
import { BaseTxComponent } from '../../../core/base-component/base-tx.component';
import { TransactionService } from '../../../shared/services/transaction.service';
import { AccountService } from '../../../shared/services/account.service';
import { SubmittableResult } from '@polkadot/api';
import { FormControl, FormGroup } from '@angular/forms';
import { SharedPostContent } from '@subsocial/types';
import { METHODS, PALLETS } from '../../../core/constants/query.const';
import { PostFacade } from '../../../store/post/post.facade';
import { Router } from '@angular/router';
import { takeValueOnce } from '../../../core/rxjs-custom/operators';
import { SignInModalService } from '../services/sign-in-modal.service';

@Component({
  selector: 'app-share-post-modal-dialog',
  templateUrl: './share-post-modal-dialog.component.html',
  styleUrls: ['./share-post-modal-dialog.component.scss'],
})
export class SharePostModalDialogComponent
  extends BaseTxComponent
  implements OnInit
{
  constructor(
    public dialogRef: MatDialogRef<SharePostModalDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Post,
    public transaction: TransactionService,
    public account: AccountService,
    public cd: ChangeDetectorRef,
    private postFacade: PostFacade,
    private router: Router,
    public signIn: SignInModalService
  ) {
    super(transaction, account, signIn, cd);
  }

  sharedPostForm = new FormGroup({
    spaceId: new FormControl(''),
    body: new FormControl(''),
  });

  ngOnInit(): void {}

  async createSharePost() {
    const pallet = PALLETS.posts;
    const method = METHODS.createPost;

    const { spaceId, body } = this.sharedPostForm.value;

    const content: SharedPostContent = {
      body,
    };

    this.contentCid = await this.saveContent(content);

    const params = [
      spaceId,
      { SharedPost: this.data.id },
      { IPFS: this.contentCid },
    ];

    await this.initExtrinsic({ pallet, params, method });

    await this.sentTransaction();
  }

  onFailed(result: SubmittableResult | null): void {}

  onSuccess(result: SubmittableResult) {
    const ids = this.getNewIdsFromResult(result);
    if (ids?.length > 0) {
      this.postFacade
        .fetchPost(ids[0])
        .pipe(takeValueOnce)
        .subscribe((post) => {
          this.router.navigate(['/' + post.postLink]);
          this.dialogRef.close();
        });
    }
  }

  validate(): boolean {
    return true;
  }
}
