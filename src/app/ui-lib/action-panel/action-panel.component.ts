import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { KIND, METHODS, PALLETS } from '../../core/constants/query.const';
import {
  ExtrinsicProps,
  TxButtonComponent,
} from '../../core/base-component/tx-button.component';
import { TransactionService } from '../../shared/services/transaction.service';
import { AccountService } from '../../shared/services/account.service';
import { SubmittableResult } from '@polkadot/api';

type OperationType = {
  update?: boolean;
  delete?: boolean;
};

type InitialVoteStatus = {
  upvoteCount: number;
  downvoteCount: number;
  isUpvoteActive: boolean | undefined;
  isDownvoteActive: boolean | undefined;
};

@Component({
  selector: 'app-action-panel',
  templateUrl: './action-panel.component.html',
  styleUrls: ['./action-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionPanelComponent extends TxButtonComponent implements OnInit {
  @Input() postId: string;
  @Input() reactionId: string | undefined;
  @Input() isShowShare = false;
  @Input() isShowComment = false;
  @Input() upvoteCount: number = 0;
  @Input() downvoteCount: number = 0;
  @Input() commentCount: number = 0;
  @Input() isUpvoteActive: boolean | undefined = false;
  @Input() isDownvoteActive: boolean | undefined = false;
  @Input() isShowLabel = false;
  @Input() isShowReply = false;
  @Input() position: 'center' | 'left' = 'center';
  @Output() replyClick = new EventEmitter();
  @Output() commentClick = new EventEmitter();

  KIND = KIND;
  initialVoteStatus: InitialVoteStatus;

  constructor(
    public transaction: TransactionService,
    public account: AccountService,
    public cd: ChangeDetectorRef
  ) {
    super(transaction, account, cd);
  }

  ngOnInit(): void {
    this.updateInitialState();
  }

  async onVoteClick(kind: KIND) {
    await this.switchHandler(kind);
  }

  async switchHandler(kind: KIND) {
    const operationType: OperationType = {};
    kind === KIND.UPVOTE
      ? (this.isUpvoteActive = !this.isUpvoteActive)
      : (this.isDownvoteActive = !this.isDownvoteActive);

    operationType.delete =
      kind === KIND.UPVOTE ? !this.isUpvoteActive : !this.isDownvoteActive;

    if (kind === KIND.UPVOTE) {
      if (this.isDownvoteActive) {
        this.downvoteCount =
          this.downvoteCount > 0 ? --this.downvoteCount : this.downvoteCount;
        operationType.update = true;
      }

      this.upvoteCount = this.isUpvoteActive
        ? ++this.upvoteCount
        : --this.upvoteCount;
    } else {
      if (this.isUpvoteActive) {
        this.upvoteCount =
          this.upvoteCount > 0 ? --this.upvoteCount : this.upvoteCount;
        operationType.update = true;
      }

      this.downvoteCount = this.isDownvoteActive
        ? ++this.downvoteCount
        : --this.downvoteCount;
    }

    kind === KIND.UPVOTE
      ? (this.isDownvoteActive = false)
      : (this.isUpvoteActive = false);

    await this.prepareAndDoTransaction(kind, operationType);
  }

  async prepareAndDoTransaction(kind: KIND, operationType: OperationType) {
    const props = this.getExtrinsicProps(kind, operationType);
    await this.initExtrinsic(props);
    await this.sentTransaction();
  }

  onFailed(result: SubmittableResult | null): void {
    this.returnToInitialState();
  }

  onSuccess(result: SubmittableResult): void {
    this.updateInitialState();
  }

  validate(): boolean {
    return true;
  }

  private getExtrinsicProps(kind: KIND, type: OperationType): ExtrinsicProps {
    let method = '';
    let params: string[];

    if (this.reactionId && type.delete) {
      method = METHODS.deletePostReaction;
      params = [this.postId, this.reactionId];
    } else if (this.reactionId && type.update) {
      method = METHODS.updatePostReaction;
      params = [this.postId, this.reactionId, kind];
    } else {
      method = METHODS.createPostReaction;
      params = [this.postId, kind];
    }

    return {
      pallet: PALLETS.reactions,
      method,
      params,
    };
  }

  private returnToInitialState() {
    this.upvoteCount = this.initialVoteStatus.upvoteCount;
    this.downvoteCount = this.initialVoteStatus.downvoteCount;
    this.isUpvoteActive = this.initialVoteStatus.isUpvoteActive;
    this.isDownvoteActive = this.initialVoteStatus.isDownvoteActive;
  }

  private updateInitialState() {
    this.initialVoteStatus = {
      upvoteCount: this.upvoteCount,
      downvoteCount: this.downvoteCount,
      isUpvoteActive: this.isUpvoteActive,
      isDownvoteActive: this.isDownvoteActive,
    };
  }
}
