import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LinkService } from '../../shared/services/link.service';
import {
  concatMap,
  filter,
  map,
  shareReplay,
  switchMap,
  tap,
} from 'rxjs/operators';
import { Post } from '../../core/models/post/post-list-item.model';
import { EMPTY, from, Observable, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/state';
import { CommentItemData } from '../../core/types/comment-data.type';
import { CommentService } from '../../shared/services/comment.service';
import { Space } from '../../store/space/space.state';
import { PostFacade } from '../../store/post/post.facade';
import { SpaceFacade } from '../../store/space/space.facade';
import { SSRLoadData } from 'src/app/core/decorators/ssr-load-data.decorator';
import { isPlatformBrowser } from '@angular/common';
import { of } from 'rxjs';

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
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  async ngOnInit() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    if (isPlatformBrowser(this.platformId)) {
      this.loadDataBrowserPlatform();
    } else {
      await this.loadDataServerPlatform();
    }
  }

  loadDataBrowserPlatform() {
    const id$ = this.route.params.pipe(
      map((params) => {
        return this.linkService.getPostIdFromLink(params['slug']);
      }),
      shareReplay(1)
    );

    this.post$ = id$.pipe(
      tap((postId) => this.postFacade.loadPost(postId)),
      switchMap((postId) => this.postFacade.getPost(postId)),
      filter((post) => !!post),
      switchMap((post) => from(this.handleIfPostIsComment(post!)))
    );

    this.space$ = this.post$.pipe(
      map((post) => post!.spaceId),
      tap((spaceId) => this.spaceFacade.loadSpace(spaceId)),
      switchMap((spaceId) => this.spaceFacade.getSpace(spaceId))
    );

    this.handleSharedPost();
  }

  @SSRLoadData()
  async loadDataServerPlatform() {
    const { slug, spaceId } = this.route.snapshot.params;
    const postId = this.linkService.getPostIdFromLink(slug);

    this.postFacade.loadPost(postId);
    this.spaceFacade.loadSpace(spaceId);

    const post = await this.postFacade.getPostOnce(postId).toPromise();
    const space = await this.spaceFacade.getSpaceOnce(spaceId).toPromise();

    this.post$ = of(post);
    this.space$ = of(space);

    this.cd.markForCheck();
  }

  private async handleIfPostIsComment(post: Post) {
    if (post.isComment && post.rootPostId) {
      const parentPostData = await this.postFacade
        .fetchPost(post.rootPostId)
        .toPromise();
      this.commentPostData = {
        postTitle: parentPostData!.title,
        link: parentPostData!.postLink,
      };
      this.cd.markForCheck();
      const copyPost = { ...post, spaceId: parentPostData!.spaceId };
      return copyPost;
    }

    return post;
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
