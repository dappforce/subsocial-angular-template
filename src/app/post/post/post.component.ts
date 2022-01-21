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
import {
  concatMap,
  filter,
  map,
  shareReplay,
  switchMap,
  takeUntil,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { Post } from '../../core/models/post/post-list-item.model';
import { EMPTY, Observable, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/state';
import { CommentItemData } from '../../core/types/comment-data.type';
import { CommentService } from '../../shared/services/comment.service';
import { Space } from '../../state/space/space.state';
import { PostFacade } from '../../state/post/post.facade';
import { SpaceFacade } from '../../state/space/space.facade';

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
  post$: Observable<Post | undefined>;
  space$: Observable<Space | undefined>;
  sharedPost$: Observable<Post | undefined>;

  commentData: CommentItemData[] = [];
  commentPostData: CommentPostData;
  isSharedPostHidden: boolean;

  private unsubscribe$: Subject<void> = new Subject();
  isHidden: boolean;
  repliesCount: number;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private linkService: LinkService,
    private cd: ChangeDetectorRef,
    private commentService: CommentService,
    private postFacade: PostFacade,
    private spaceFacade: SpaceFacade,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  async ngOnInit() {
    const ids$ = this.route.params.pipe(
      map((params) => {
        const slug = params['slug'];
        const spaceId = params['spaceId'];
        return [this.linkService.getPostIdFromLink(slug), spaceId];
      }),
      shareReplay(1)
    );

    this.post$ = ids$.pipe(
      tap(([postId]) => this.postFacade.loadPost(postId)),
      switchMap(([postId]) => this.postFacade.getPost(postId)),
      filter((post) => !!post)
    );

    this.space$ = ids$.pipe(
      tap(([, spaceId]) => this.spaceFacade.loadSpace(spaceId)),
      switchMap(([, spaceId]) => this.spaceFacade.getSpace(spaceId))
    );

    this.handleSharedPost();
  }

  private async handleIfPostIsComment() {
    // if (this.postData.isComment && this.postData.rootPostId) {
    //   const parentPostData = (await this.postService.getOrLoadPost(
    //     this.postData.rootPostId
    //   )) as Post;
    //   this.commentPostData = {
    //     postTitle: parentPostData.title,
    //     link: parentPostData.postLink,
    //   };
    //   this.postData.spaceName = parentPostData.spaceName;
    //   this.postData.spaceId = parentPostData.spaceId;
    // }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onSwitchHidden() {
    this.isHidden = !this.isHidden;
  }

  handleSharedPost() {
    this.sharedPost$ = this.post$.pipe(
      concatMap((post) => {
        if (post?.isSharedPost && post.sharedPostId) {
          return this.postFacade.fetchPost(post.sharedPostId);
        } else {
          return EMPTY;
        }
      })
    );
  }

  onViewReaction() {}
}
