import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { BaseTxComponent } from './base-tx.component';
import { TransactionService } from '../../shared/services/transaction.service';
import { AccountService } from '../../shared/services/account.service';
import { SubmittableResult } from '@polkadot/api';
import { METHODS, PALLETS } from '../constants/query.const';
import { VisibilityService } from '../../shared/services/visibility.service';

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
    public visibility: VisibilityService
  ) {
    super(transaction, account, cd);
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

    console.log(params);

    await this.initExtrinsic({ pallet, params, method });
  }
}
