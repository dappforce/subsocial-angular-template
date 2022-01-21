import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { AccountService } from '../../../shared/services/account.service';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { AVATAR_SIZE } from '../../../core/constants/size.const';
import { BaseTxComponent } from '../../../core/base-component/base-tx.component';
import { TransactionService } from '../../../shared/services/transaction.service';
import { SubmittableResult } from '@polkadot/api';
import { FORM_STATUS } from '../../../core/enums/common';
import { METHODS, PALLETS } from '../../../core/constants/query.const';
import { PostService } from '../../../post/services/post.service';
import { MdeEditorComponent } from '../../input/mde-editor/mde-editor.component';
import { Post } from '../../../core/models/post/post-list-item.model';
import { PostFacade } from '../../../state/post/post.facade';
import { ReplyFacade } from '../../../state/reply-id/reply.facade';
import { Update } from '@ngrx/entity';

@Component({
  selector: 'app-comment-input',
  templateUrl: './comment-input.component.html',
  styleUrls: ['./comment-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CommentInputComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentInputComponent extends BaseTxComponent implements OnInit {
  @Input() parentPostId: string | undefined;
  @Input() rootPostId: string;
  @Input() comment: Post | undefined;
  @Input() type: 'edit' | 'create' = 'create';
  @Input() autofocus: boolean;
  @Input() isReply: boolean;
  @Output() sendSuccess = new EventEmitter();
  @Output() cancel = new EventEmitter();

  @ViewChild(MdeEditorComponent) mdeComponent: MdeEditorComponent;

  showSendButton: boolean;
  disabledButton: boolean = true;
  avatar$: Observable<string | undefined>;
  AVATAR_SIZE = AVATAR_SIZE;

  get isEdit() {
    return this.type === 'edit';
  }

  commentForm = new FormControl('', { validators: Validators.required });

  private unsubscribe$: Subject<void> = new Subject();

  constructor(
    public transaction: TransactionService,
    public account: AccountService,
    public cd: ChangeDetectorRef,
    private postService: PostService,
    private replyFacade: ReplyFacade,
    private postFacade: PostFacade
  ) {
    super(transaction, account, cd);
  }

  ngOnInit(): void {
    if (this.autofocus) {
      this.showSendButton = true;
    }

    if (this.isEdit) {
      this.commentForm.patchValue(this.comment?.body);
    }

    this.handleDisableSendButton();

    this.avatar$ = this.accountService.currentAccount$.pipe(
      map((account) => account?.avatar)
    );
  }

  onFocus() {
    this.showSendButton = true;
    this.cd.markForCheck();
  }

  onFocusOut() {
    this.showSendButton = this.commentForm.valid;
    this.cd.markForCheck();
  }

  onFailed(result: SubmittableResult | null): void {}

  async onSuccess(result: SubmittableResult) {
    const ids = this.getNewIdsFromEvent(result);
    const parentId = this.parentPostId || this.rootPostId;

    if (!this.isEdit) {
      this.postFacade.addNewCommentPost({ parentId, replyId: ids[0] });
    } else {
      const update: Update<Post> = {
        id: this.comment?.id!,
        changes: { body: this.commentForm.value },
      };
      this.postFacade.updatePost(update);
      this.sendSuccess.emit();
    }

    this.commentForm.patchValue('');
  }

  validate(): boolean {
    return this.commentForm.valid;
  }

  async sendComments() {
    const pallet = PALLETS.posts;
    const method = this.isEdit ? METHODS.updatePost : METHODS.createPost;

    const body = this.commentForm.value;

    this.contentCid = await this.saveContent({ body });

    if (!this.contentCid) return;

    const commentExt = {
      Comment: {
        parentId:
          this.parentPostId !== this.rootPostId ? this.parentPostId : null,
        rootPostId: this.rootPostId,
      },
    };

    let params: any[];

    if (this.isEdit) {
      const update = {
        spaceId: null,
        content: {
          IPFS: this.contentCid,
        },
        hidden: null,
      };
      params = [this.comment?.id, update];
    } else {
      params = [null, commentExt, { IPFS: this.contentCid }];
    }

    await this.initExtrinsic({ pallet, params, method });

    await this.sentTransaction();
  }

  private handleDisableSendButton() {
    let savedStatus: FORM_STATUS = FORM_STATUS.INVALID;
    this.disabledButton = true;

    this.commentForm.statusChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((status) => {
        if (savedStatus !== status) {
          this.disabledButton = status === FORM_STATUS.INVALID;
          this.cd.markForCheck();
          savedStatus = status;
        }
      });
  }

  ngOnDestroy(): void {
    //check for storybook
    if (typeof this.unsubscribe$ !== 'string') {
      this.unsubscribe$?.next();
      this.unsubscribe$?.complete();
    }
  }

  cancelComment() {
    this.cancel.emit();
    this.commentForm.reset();
    this.showSendButton = false;
    this.mdeComponent.setInitView();
  }
}
