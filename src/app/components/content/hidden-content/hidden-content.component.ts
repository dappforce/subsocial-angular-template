import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { BaseVisibleTxComponent } from '../../../core/base-component/base-visible-tx.component';
import { TransactionService } from '../../../shared/services/transaction.service';
import { AccountService } from '../../../shared/services/account.service';
import { VisibilityService } from '../../../shared/services/visibility.service';
import { Observable } from 'rxjs';
import { SignInModalService } from '../../modal-dialogs/services/sign-in-modal.service';

@Component({
  selector: 'app-hidden-content',
  templateUrl: './hidden-content.component.html',
  styleUrls: ['./hidden-content.component.scss'],
})
export class HiddenContentComponent
  extends BaseVisibleTxComponent
  implements OnInit
{
  @Input() type: 'post' | 'space' | 'comment';
  @Input() id: string;

  constructor(
    public transaction: TransactionService,
    public account: AccountService,
    public cd: ChangeDetectorRef,
    public visibility: VisibilityService,
    public signIn: SignInModalService
  ) {
    super(transaction, account, cd, signIn, visibility);
  }

  hidden$: Observable<boolean>;
  spaceHidden$: Observable<boolean>;
  hiddenMessageKey: string;

  ngOnInit(): void {
    this.hiddenMessageKey = this.getHiddenMessageKey();
    this.entityId = this.id;
    this.visibleOperationType = this.type === 'comment' ? 'post' : this.type;

    if (this.visibleOperationType === 'post') {
      this.hidden$ = this.visibility.getIsPostHidden(this.id);
      this.spaceHidden$ = this.visibility.getIsSpaceHiddenByPostId(this.id);
    } else if (this.visibleOperationType === 'space') {
      this.hidden$ = this.visibility.getIsSpaceHidden(this.id);
    }
  }

  getHiddenMessageKey() {
    let key = '';
    switch (this.type) {
      case 'comment':
        key = 'hiddenComment';
        break;
      case 'post':
        key = 'hiddenPost';
        break;
      case 'space':
        key = 'hiddenSpace';
        break;
    }

    return 'generalMessages.' + key;
  }
}
