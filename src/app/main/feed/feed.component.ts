import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { AccountService } from '../../shared/services/account.service';
import {
  filter,
  map,
  mergeMap,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { SubsocialApiService } from '../../shared/services/subsocial-api.service';
import {
  BehaviorSubject,
  combineLatest,
  forkJoin,
  from,
  Observable,
  Subject,
} from 'rxjs';
import { PostId } from '@subsocial/definitions/interfaces/subsocial/types';
import { ScrollProps } from '../../core/classes/scroll-props.class';
import { Post } from '../../core/models/post/post-list-item.model';
import { ActivityService } from '../../shared/services/activity.service';
import { PostFacade } from '../../state/post/post.facade';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedComponent implements OnInit {
  constructor(
    private accountService: AccountService,
    private api: SubsocialApiService,
    private activityService: ActivityService,
    private cd: ChangeDetectorRef,
    private postFacade: PostFacade
  ) {}

  public scrollProps = new ScrollProps(20);
  private scrollDownEventSource = new BehaviorSubject<ScrollProps>(
    this.scrollProps
  );
  scrollDownEvent$ = this.scrollDownEventSource.asObservable();
  public scrollDistance = 1;
  loading: boolean;
  isBlockInfinityScroll = false;
  feedCount: number;

  loadMethod: 'blockchain' | 'offchain' = 'offchain';

  postIds$: Observable<string[]>;
  private unsubscribe$: Subject<void> = new Subject();

  post$: Observable<Post[]>;

  postIdsSet = new Set<string>();

  ngOnInit(): void {
    if (this.loadMethod === 'blockchain') {
      this.loadIdsFromBlockchain();
    } else {
      this.loadPostsFromOffchain();
    }
  }

  loadPostsFromOffchain() {
    this.accountService.currentAccount$
      .pipe(
        filter((account) => !!account),
        mergeMap((account) => this.activityService.getFeedCount(account!.id)),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((count) => {
        this.feedCount = Number.parseInt(count);
        this.scrollProps.max = this.feedCount;
        this.cd.markForCheck();
      });

    this.post$ = combineLatest([
      this.accountService.currentAccount$,
      this.scrollDownEvent$,
    ]).pipe(
      filter(
        ([account, props]) =>
          !!account && !props.isFinish && !this.isBlockInfinityScroll
      ),
      tap((_) => this.setLoading(true)),
      mergeMap(([account, props]) =>
        this.activityService
          .getFeedActivities(account!.id, props.startIndex, props.limit)
          .pipe(
            map(
              (activities) =>
                activities
                  .map((activity) => activity.post_id)
                  .filter((id) => !!id) as string[]
            )
          )
      ),
      tap((ids) => this.postFacade.loadPosts(ids)),
      map((ids) => this.getUniqueIds(ids)),
      mergeMap((ids) =>
        this.postFacade.getPosts(ids).pipe(filter((posts) => posts.length > 0))
      ),
      tap((_) => this.setLoading(false))
    );
  }

  getUniqueIds(ids: string[]) {
    ids.forEach((id) => this.postIdsSet.add(id));
    return Array.from(this.postIdsSet);
  }

  loadIdsFromBlockchain() {
    this.postIds$ = this.accountService.currentAccount$.pipe(
      filter((account) => !!account),
      switchMap((account) =>
        this.api.api.subsocial.substrate.spaceIdsFollowedByAccount(account!.id)
      ),
      switchMap((spaceIds) => {
        const postIdsArray$: Observable<PostId[]>[] = [];
        spaceIds.forEach((id) => {
          const postIds$ = from(
            this.api.api.subsocial.substrate.postIdsBySpaceId(id)
          );
          postIdsArray$.push(postIds$);
        });

        return forkJoin(postIdsArray$);
      }),
      map((postIdsArray) =>
        postIdsArray
          .flat()
          .sort((a, b) => b.sub(a).toNumber())
          .map((postIds) => postIds.toString())
      ),
      filter((ids) => ids?.length > 0),
      takeUntil(this.unsubscribe$)
    );
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  setLoading(status: boolean) {
    this.isBlockInfinityScroll = status;
    this.loading = status;
    this.cd.markForCheck();
  }

  trackPostById(index: number, item: Post) {
    return item.id;
  }

  onScrollDown() {
    if (!this.isBlockInfinityScroll) {
      this.scrollProps.next();
      this.scrollDownEventSource.next(this.scrollProps);
    }
  }
}
