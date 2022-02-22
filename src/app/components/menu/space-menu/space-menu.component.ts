import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { BaseVisibleTxComponent } from '../../../core/base-component/base-visible-tx.component';
import { TransactionService } from '../../../shared/services/transaction.service';
import { AccountService } from '../../../shared/services/account.service';
import { PermissionsService } from '../../../shared/services/permissions.service';
import { filter, mergeMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { VisibilityService } from '../../../shared/services/visibility.service';
import { SignInModalService } from '../../modal-dialogs/services/sign-in-modal.service';

@Component({
  selector: 'app-space-menu',
  templateUrl: './space-menu.component.html',
  styleUrls: ['./space-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpaceMenuComponent
  extends BaseVisibleTxComponent
  implements OnInit
{
  @Input() spaceId: string;
  @Input() isHidden: boolean;
  @Output() onClickViewReaction = new EventEmitter();
  @Output() edit = new EventEmitter();

  isOwner$: Observable<boolean>;

  constructor(
    public transaction: TransactionService,
    public account: AccountService,
    public cd: ChangeDetectorRef,
    public visibility: VisibilityService,
    private permission: PermissionsService,
    public signIn: SignInModalService
  ) {
    super(transaction, account, cd, signIn, visibility);
  }

  ngOnInit(): void {
    this.visibleOperationType = 'space';
    this.entityId = this.spaceId;

    this.isOwner$ = this.account.currentAccount$.pipe(
      filter((account) => !!account),
      mergeMap((account) =>
        this.permission.checkIfSpaceOwner(account!.id, this.spaceId)
      )
    );
  }
}
