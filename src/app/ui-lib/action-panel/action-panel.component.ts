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
  BaseTxComponent,
} from '../../core/base-component/base-tx.component';
import { TransactionService } from '../../shared/services/transaction.service';
import { AccountService } from '../../shared/services/account.service';
import { SubmittableResult } from '@polkadot/api';
import { MyPostReactions } from '../../state/my-post-reactions/my-post-reactions.state';
import { MyPostReactionFacade } from '../../state/my-post-reactions/my-post-reaction.facade';
import { filter, mergeMap, switchMap } from 'rxjs/operators';
import { SignInModalService } from '../modal-dialogs/services/sign-in-modal.service';

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
export class ActionPanelComponent extends BaseTxComponent implements OnInit {
  @Input() postId: string;
  @Input() isShowShare = false;
  @Input() isShowComment = false;
  @Input() upvoteCount: number = 0;
  @Input() downvoteCount: number = 0;
  @Input() commentCount: number = 0;
  @Input() sharesCount: number = 0;
  @Input() isShowLabel = false;
  @Input() isShowReply = false;
  @Input() fontSize: number;
  @Input() position: 'center' | 'left' = 'center';
  @Output() replyClick = new EventEmitter();
  @Output() commentClick = new EventEmitter();
  @Output() shareClick = new EventEmitter();

  reaction: MyPostReactions | undefined;
  KIND = KIND;
  initialVoteStatus: InitialVoteStatus;
  isUpvoteActive: boolean;
  isDownvoteActive: boolean;

  constructor(
    public transaction: TransactionService,
    public account: AccountService,
    public cd: ChangeDetectorRef,
    private reactionFacade: MyPostReactionFacade,
    public signIn: SignInModalService
  ) {
    super(transaction, account, signIn, cd);
  }

  ngOnInit(): void {
    this.account.currentAccount$
      .pipe(
        filter((account) => !!account),
        mergeMap((account) =>
          this.reactionFacade.getReactionByPostId(account!.id, this.postId)
        )
      )
      .subscribe((reaction) => {
        this.reaction = reaction;
        this.isDownvoteActive = reaction?.kind === 'Downvote';
        this.isUpvoteActive = reaction?.kind === 'Upvote';
        this.updateInitialState();
        this.cd.markForCheck();
      });
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
    const ids = this.getNewIdsFromEvent(result);
    if (ids.length > 0) {
      this.reactionFacade.loadMyPostReactionIds(ids);
    }
  }

  validate(): boolean {
    return true;
  }

  private getExtrinsicProps(kind: KIND, type: OperationType): ExtrinsicProps {
    let method = '';
    let params: string[];

    if (this.reaction?.reactionId && type.delete) {
      method = METHODS.deletePostReaction;
      params = [this.postId, this.reaction?.reactionId];
    } else if (this.reaction?.reactionId && type.update) {
      method = METHODS.updatePostReaction;
      params = [this.postId, this.reaction?.reactionId, kind];
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
    this.isUpvoteActive = !!this.initialVoteStatus.isUpvoteActive;
    this.isDownvoteActive = !!this.initialVoteStatus.isDownvoteActive;
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
