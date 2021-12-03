import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LinkService } from '../../shared/services/link.service';
import { map, take, takeUntil, tap } from 'rxjs/operators';
import { PostListItemData } from '../../core/models/post/post-list-item.model';
import { Subject } from 'rxjs';
import { SpaceListItemData } from '../../core/models/space/space-list-item.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/state';
import { getPostsByIds, loadPostsSuccess } from '../../state/post/post.actions';
import { selectPostWithAllDetailsById } from '../../state/post/post.selectors';
import { selectSpaceById } from '../../state/space/space.selectors';
import { CommentItemData } from '../../core/types/comment-data.type';
import { selectCommentItemsData } from '../../state/reply-id/reply-id.selectors';
import { StoreService } from '../../state/store.service';
import { SSRLoadData } from '../../core/decorators/ssr-load-data.decorator.tw';
import { PostService } from '../services/post.service';
import { getReplyIdsByParentPostId } from '../../state/reply-id/reply-id.actions';
import { CommentService } from '../../shared/services/comment.service';

type CommentPostData = {
  postTitle: string;
  link: string;
};

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class PostComponent implements OnInit, OnDestroy {
  postData: PostListItemData;
  spaceData: SpaceListItemData | undefined;
  commentData: CommentItemData[] = [];
  commentPostData: CommentPostData;

  private unsubscribe$: Subject<void> = new Subject();

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private linkService: LinkService,
    private cd: ChangeDetectorRef,
    private storeService: StoreService,
    private postService: PostService,
    private commentService: CommentService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  async ngOnInit() {
    this.getPostId().subscribe(async (postId) => await this.loadData(postId));
  }

  @SSRLoadData()
  async loadData(postId: string) {
    this.postData = await this.postService.getOrLoadPost(postId);

    await this.handleIfPostIsComment();

    this.spaceData = this.postData.spaceId
      ? await this.getSpaceData(this.postData.spaceId)
      : undefined;

    this.commentData = await this.getCommentData(postId);

    this.cd.markForCheck();
  }

  private async getSpaceData(spaceId: string) {
    return (this.spaceData = await this.store
      .select(selectSpaceById(spaceId))
      .pipe(take(1))
      .toPromise());
  }

  private async getCommentData(postId: string) {
    return this.commentService.getOrLoadCommentDataByPostId(postId);
  }

  private getPostId() {
    return this.route.params.pipe(
      map((params) => {
        const slug = params['slug'];
        return this.linkService.getPostIdFromLink(slug);
      }),
      takeUntil(this.unsubscribe$)
    );
  }

  private async handleIfPostIsComment() {
    if (this.postData.isComment && this.postData.rootPostId) {
      const parentPostData = (await this.postService.getOrLoadPost(
        this.postData.rootPostId
      )) as PostListItemData;
      this.commentPostData = {
        postTitle: parentPostData.title,
        link: parentPostData.postLink,
      };
      this.postData.spaceName = parentPostData.spaceName;
      this.postData.spaceId = parentPostData.spaceId;
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
