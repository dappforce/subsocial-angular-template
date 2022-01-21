import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { TransactionService } from '../../../shared/services/transaction.service';
import { AccountService } from '../../../shared/services/account.service';
import { BaseVisibleTxComponent } from '../../../core/base-component/base-visible-tx.component';
import { Post } from '../../../core/models/post/post-list-item.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/state';
import { Observable } from 'rxjs';
import { PermissionsService } from '../../../shared/services/permissions.service';
import { filter, mergeMap } from 'rxjs/operators';
import { VisibilityService } from '../../../shared/services/visibility.service';

@Component({
  selector: 'app-post-menu',
  templateUrl: './post-menu.component.html',
  styleUrls: ['./post-menu.component.scss'],
})
export class PostMenuComponent
  extends BaseVisibleTxComponent
  implements OnInit
{
  @Input() post: Post;
  @Output() onClickViewReaction = new EventEmitter();

  isOwner$: Observable<boolean>;
  isHidden$: Observable<boolean>;

  constructor(
    public transaction: TransactionService,
    public account: AccountService,
    public cd: ChangeDetectorRef,
    public visibility: VisibilityService,
    private permission: PermissionsService
  ) {
    super(transaction, account, cd, visibility);
  }

  ngOnInit(): void {
    this.entityId = this.post.id;
    this.visibleOperationType = 'post';

    this.isHidden$ = this.visibility.getIsPostHidden(this.entityId);

    this.isOwner$ = this.account.currentAccount$.pipe(
      filter((account) => !!account),
      mergeMap((account) =>
        this.permission.checkIfPostOwner(account!.id, this.post.id)
      )
    );
  }
}
