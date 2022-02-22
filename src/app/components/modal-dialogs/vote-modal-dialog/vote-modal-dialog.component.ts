import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { from } from 'rxjs';
import { TabLinkData } from '../../../core/models/tab-link-data.model';
import { ReactionModalData } from '../../../core/types/dialog-modal-data.types';
import { PostService } from '../../../post/services/post.service';
import { switchMap, take } from 'rxjs/operators';

@Component({
  selector: 'app-vote-modal-dialog',
  templateUrl: './vote-modal-dialog.component.html',
  styleUrls: ['./vote-modal-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class VoteModalDialogComponent implements OnInit {
  public tabLinks: TabLinkData[] = [
    { tabName: 'upvotes', additionalInfo: this.data.upvotesCount },
    { tabName: 'downvotes', additionalInfo: this.data.downvotesCount },
  ];

  activeTab: TabLinkData = this.tabLinks[0];

  constructor(
    public dialogRef: MatDialogRef<VoteModalDialogComponent>,
    private postService: PostService,
    @Inject(MAT_DIALOG_DATA) public data: ReactionModalData,
    private cd: ChangeDetectorRef
  ) {}

  upvotesIds: string[] = [];
  downvotesIds: string[] = [];

  reactionCount: number = 0;

  ngOnInit(): void {
    from(this.postService.getReactionIdsByPostId(this.data.postId))
      .pipe(
        switchMap((ids) => from(this.postService.getReactionsByIds(ids))),
        take(1)
      )
      .subscribe((reactions) => {
        reactions.forEach((reaction) =>
          reaction.isUpvote
            ? this.upvotesIds.push(reaction.profileId)
            : this.downvotesIds.push(reaction.profileId)
        );

        this.reactionCount = this.upvotesIds.length + this.downvotesIds.length;
        this.cd.markForCheck();
      });
  }

  onTabClick(activeTab: TabLinkData) {
    this.activeTab = activeTab;
  }
}
