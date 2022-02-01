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
import { Post } from '../../../core/models/post/post-list-item.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/state';
import { PermissionsService } from '../../../shared/services/permissions.service';
import { filter, mergeMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { VisibilityService } from '../../../shared/services/visibility.service';
import { SignInModalService } from '../../modal-dialogs/services/sign-in-modal.service';

@Component({
  selector: 'app-comment-menu',
  templateUrl: './comment-menu.component.html',
  styleUrls: ['./comment-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentMenuComponent
  extends BaseVisibleTxComponent
  implements OnInit
{
  @Input() comment: Post;
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
    this.visibleOperationType = 'post';
    this.entityId = this.comment.id;

    this.isOwner$ = this.account.currentAccount$.pipe(
      filter((account) => !!account),
      mergeMap((account) =>
        this.permission.checkIfPostOwner(account!.id, this.comment.id)
      )
    );
  }
}
