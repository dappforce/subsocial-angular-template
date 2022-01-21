import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { BaseTxComponent } from '../../../core/base-component/base-tx.component';
import { TransactionService } from '../../../shared/services/transaction.service';
import { AccountService } from '../../../shared/services/account.service';
import { SubmittableResult } from '@polkadot/api';
import { METHODS, PALLETS } from '../../../core/constants/query.const';

const STATUS = {
  FOLLOW: 'follow',
  FOLLOWING: 'following',
};

const TYPE = {
  SPACE: 'space',
  PROFILE: 'profile',
};

type FollowButtonType = 'space' | 'profile';
type FollowButtonSize = 'medium' | 'large';
type FollowButtonWidth = 'full' | 'static';

@Component({
  selector: 'app-follow-button',
  templateUrl: './follow-button.component.html',
  styleUrls: ['./follow-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FollowButtonComponent extends BaseTxComponent implements OnInit {
  @Input() type: FollowButtonType = 'space';
  @Input() size: FollowButtonSize = 'medium';
  @Input() width: FollowButtonWidth = 'static';
  @Input() entityId: string;
  @Input() set isFollow(value: boolean | null) {
    this.label = value ? STATUS.FOLLOWING : STATUS.FOLLOW;
    this._isFollow = !!value;
  }

  get isFollow() {
    return this._isFollow;
  }

  label: string = STATUS.FOLLOW;
  private _isFollow: boolean = false;

  constructor(
    public transaction: TransactionService,
    public account: AccountService,
    public cd: ChangeDetectorRef
  ) {
    super(transaction, account, cd);
  }

  async ngOnInit() {}

  onFailed(result: SubmittableResult | null): void {}

  onSuccess(result: SubmittableResult): void {
    this._isFollow = !this._isFollow;
    this.label = this._isFollow ? STATUS.FOLLOWING : STATUS.FOLLOW;
    this.cd.markForCheck();
  }

  validate(): boolean {
    return true;
  }

  async onClick() {
    let pallet = '';
    let method = '';

    switch (this.type) {
      case TYPE.SPACE:
        pallet = PALLETS.spaceFollows;
        method =
          this.label === STATUS.FOLLOW
            ? METHODS.followSpace
            : METHODS.unfollowSpace;
        break;
      case TYPE.PROFILE:
        pallet = PALLETS.profileFollows;
        method =
          this.label === STATUS.FOLLOW
            ? METHODS.followAccount
            : METHODS.unfollowAccount;
        break;
    }

    await this.initExtrinsic({
      pallet,
      method,
      params: [this.entityId],
    });

    await this.sentTransaction();
  }
}
