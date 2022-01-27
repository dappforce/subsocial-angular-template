import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  Input,
  Output,
} from '@angular/core';
import { BaseTxComponent } from './base-tx.component';
import { TransactionService } from '../../shared/services/transaction.service';
import { AccountService } from '../../shared/services/account.service';
import { SubmittableResult } from '@polkadot/api';
import { METHODS, PALLETS } from '../constants/query.const';
import { PostService } from '../../post/services/post.service';
import { SpaceService } from '../../space/services/space.service';
import { AppState } from '../../state/state';
import { Store } from '@ngrx/store';
import { loadPostById } from '../../state/post/post.actions';
import { VisibilityService } from '../../shared/services/visibility.service';
import { SignInModalService } from '../../ui-lib/modal-dialogs/services/sign-in-modal.service';

type VisibleOperationType = 'post' | 'space';

@Component({
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseVisibleTxComponent extends BaseTxComponent {
  @Output() switchHidden = new EventEmitter();

  visibleOperationType: VisibleOperationType;
  entityId: string;

  get isPost() {
    return this.visibleOperationType === 'post';
  }

  constructor(
    public transaction: TransactionService,
    public account: AccountService,
    public cd: ChangeDetectorRef,
    public signIn: SignInModalService,
    public visibility: VisibilityService
  ) {
    super(transaction, account, signIn, cd);
  }

  onFailed(result: SubmittableResult | null): void {}

  async onSuccess(result: SubmittableResult) {
    if (this.visibleOperationType === 'post') {
      this.visibility.switchPostVisibility(this.entityId);
    } else if (this.visibleOperationType === 'space') {
      this.visibility.switchSpaceVisibility(this.entityId);
    }

    this.switchHidden.emit();
  }

  validate(): boolean {
    return true;
  }

  async hide() {
    await this.setupInitExtrinsic(true);
    await this.sentTransaction();
  }

  async show() {
    await this.setupInitExtrinsic(false);
    await this.sentTransaction();
  }

  private async setupInitExtrinsic(hidden: boolean) {
    const pallet = this.isPost ? PALLETS.posts : PALLETS.spaces;
    const method = this.isPost ? METHODS.updatePost : METHODS.updateSpace;

    let update: any;

    if (this.isPost) {
      update = {
        spaceId: null,
        content: null,
        hidden,
      };
    } else {
      update = {
        handle: null,
        content: null,
        hidden,
        permissions: null,
      };
    }

    const params = [this.entityId, update];

    await this.initExtrinsic({ pallet, params, method });
  }
}
