import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { NotificationService } from '../services/notification.service';
import { AccountService } from '../../shared/services/account.service';
import {
  concatMap,
  filter,
  map,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { Activity } from '@subsocial/types';
import { AppState } from '../../state/state';
import { Store } from '@ngrx/store';
import { PostFacade } from '../../state/post/post.facade';
import { ProfileFacade } from '../../state/profile/profile.facade';
import { SpaceFacade } from '../../state/space/space.facade';
import { ScrollProps } from '../../core/classes/scroll-props.class';
import { BehaviorSubject, combineLatest, forkJoin, Subject } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { environment } from '../../../environments/environment';

export type NotificationItem = {
  id: string;
  profileId: string;
  profileName: string;
  profileLink: string;
  aggregate: number;
  event: string;
  name: string;
  contentLink: string;
  date: string;
  avatar: string;
  image: string;
};

type NotificationInfoProps = {
  contentLink?: string;
  image?: string;
  name?: string;
};

@Component({
  selector: 'app-notification-page',
  templateUrl: './notification-page.component.html',
  styleUrls: ['./notification-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationPageComponent implements OnInit, OnDestroy {
  constructor(
    private notificationService: NotificationService,
    private accountService: AccountService,
    private cd: ChangeDetectorRef,
    private store: Store<AppState>,
    private postFacade: PostFacade,
    private profileFacade: ProfileFacade,
    private spaceFacade: SpaceFacade
  ) {}

  wsSubject: WebSocketSubject<unknown>;
  notifications: NotificationItem[] = [];
  public scrollProps = new ScrollProps(20);
  private scrollDownEventSource = new BehaviorSubject<ScrollProps>(
    this.scrollProps
  );
  scrollDownEvent$ = this.scrollDownEventSource.asObservable();
  public scrollDistance = 1;
  loading: boolean;
  isBlockInfinityScroll = false;
  isFirstNotifications: boolean;
  prevAccountId: string | undefined;
  noNotification$ = new Subject();

  private unsubscribe$: Subject<void> = new Subject();

  ngOnInit(): void {
    this.initWebsocketConnection();

    combineLatest([this.scrollDownEvent$, this.accountService.currentAccount$])
      .pipe(
        filter(([, account]) => !!account),
        tap((_) => (this.isBlockInfinityScroll = true)),
        concatMap(([props, account]) =>
          this.notificationService.getNotificationCount(account!.id).pipe(
            map((count) => {
              this.scrollProps.max = count!;
              this.checkIfAccountChange(account!.id);
              return { id: account!.id, props, count };
            })
          )
        ),
        filter((_) => !this.scrollProps.isFinish),
        tap(({ count }) => {
          count > 0 ? this.setLoading(true) : this.noNotification$.next(true);
        }),
        switchMap(({ id, props }) => {
          return this.notificationService.loadNotificationActivity(
            id,
            this.scrollProps.startIndex,
            this.scrollProps.limit
          );
        }),
        tap((activities) => this.loadActivitiesEntityData(activities)),
        switchMap((activities) =>
          forkJoin(activities.map((activity) => this.getNotification(activity)))
        ),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((notifications) => {
        this.notifications = [...this.notifications, ...notifications];
        this.setLoading(false);
        this.isBlockInfinityScroll = false;
        this.cd.markForCheck();
      });
  }

  setLoading(status: boolean) {
    this.loading = status;
    this.cd.markForCheck();
  }

  clearNotificationsCount(activities: Activity[]) {
    const lastActivity = activities[0];
    if (
      environment.enableSessionKey &&
      lastActivity &&
      this.isFirstNotifications
    ) {
      const accountId = this.accountService.getCurrentAccountId();
      accountId &&
        this.notificationService.readAllNotifications(
          lastActivity.block_number,
          lastActivity.event_index,
          accountId,
          this.wsSubject
        );
    }
  }

  initWebsocketConnection() {
    this.wsSubject = webSocket(environment.offchainWs);

    this.wsSubject.pipe(takeUntil(this.unsubscribe$)).subscribe(
      (count) => this.notificationService.setNotificationCount(count as string),
      (err) => console.error('Unexpected Websocket Error:', err)
    );
  }

  loadActivitiesEntityData(activities: Activity[]) {
    const spaceIdsSet = new Set<string>();
    const postIdsSet = new Set<string>();
    const profileIdsSet = new Set<string>();

    activities.forEach((activity) => {
      activity.space_id && spaceIdsSet.add(activity.space_id);
      activity.post_id && postIdsSet.add(activity.post_id);
      activity.comment_id && postIdsSet.add(activity.comment_id);
      activity.account && profileIdsSet.add(activity.account);
    });

    const spaceIds = Array.from(spaceIdsSet);
    const postIds = Array.from(postIdsSet);
    const profileIds = Array.from(profileIdsSet);

    this.postFacade.loadPosts(postIds, 'all');
    this.spaceFacade.loadSpaces(spaceIds);
    this.profileFacade.loadProfiles(profileIds);
  }

  getNotification(activity: Activity) {
    switch (activity.event) {
      case 'AccountFollowed':
        return this.accountFollowedHandle(activity);
      case 'SpaceFollowed':
        return this.handleActivityWithSpace(activity);
      case 'SpaceCreated':
        return this.handleActivityWithSpace(activity);
      case 'CommentCreated':
        return this.handleActivityWithPost(activity);
      case 'CommentReplyCreated':
        return this.handleActivityWithPost(activity);
      case 'PostShared':
        return this.handleActivityWithPost(activity);
      case 'CommentShared':
        return this.handleActivityWithPost(activity);
      case 'PostReactionCreated':
        return this.handleActivityWithPost(activity);
      case 'CommentReactionCreated':
        return this.handleActivityWithPost(activity);
      case 'PostCreated':
        return this.handleActivityWithPost(activity);
    }
  }

  handleActivityWithPost(activity: Activity) {
    return this.postFacade.getPostOnce(activity.post_id!).pipe(
      switchMap((post) =>
        this.createItem(
          {
            image: post?.imageUrl,
            name: post?.title || 'link',
            contentLink: post?.postLink,
          },
          activity
        )
      )
    );
  }

  handleActivityWithSpace(activity: Activity) {
    return this.spaceFacade.getSpaceOnce(activity.space_id!).pipe(
      switchMap((space) =>
        this.createItem(
          {
            image: space?.image,
            name: space?.name,
            contentLink: '/' + space?.id,
          },
          activity
        )
      )
    );
  }

  accountFollowedHandle(activity: Activity) {
    return this.profileFacade.getProfileOnce(activity.following_id!).pipe(
      switchMap((profile) =>
        this.createItem(
          {
            image: profile?.avatar,
            name: profile?.name || profile?.id,
            contentLink: '/accounts/' + profile?.id,
          },
          activity
        )
      )
    );
  }

  createItem(props: NotificationInfoProps, activity: Activity) {
    return this.profileFacade.getProfileOnce(activity.account).pipe(
      map((profile) => {
        return {
          id: profile!.id + activity.date,
          profileName: profile!.name,
          profileId: profile!.id,
          aggregate: activity.agg_count,
          event: activity.event,
          name: props.name,
          date: activity.date,
          avatar: profile!.avatar || '',
          image: props.image || '',
          contentLink: props.contentLink,

          profileLink: '/accounts/' + profile!.id,
        } as NotificationItem;
      })
    );
  }

  onScrollDown() {
    if (!this.isBlockInfinityScroll) {
      this.scrollProps.next();
      this.scrollDownEventSource.next(this.scrollProps);
    }
  }

  trackById(index: number, item: NotificationItem) {
    return item.id;
  }

  private checkIfAccountChange(id: string | undefined) {
    if (id && this.prevAccountId !== id) {
      this.scrollProps.setDefault();
      this.noNotification$.next(false);
      this.notifications = [];
      this.cd.markForCheck();
    }
    this.prevAccountId = id;
  }

  ngOnDestroy(): void {
    this.unsubscribe$?.next();
    this.unsubscribe$?.complete();
  }
}
