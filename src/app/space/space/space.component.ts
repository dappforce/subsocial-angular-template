import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpaceService } from '../services/space.service';
import { PostService } from '../../post/services/post.service';
import { Space } from '../../state/space/space.state';
import { from, Observable } from 'rxjs';
import { SpaceFacade } from '../../state/space/space.facade';
import {
  filter,
  map,
  shareReplay,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { PermissionsService } from '../../shared/services/permissions.service';
import { AccountService } from '../../shared/services/account.service';

@Component({
  selector: 'app-space',
  templateUrl: './space.component.html',
  styleUrls: ['./space.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpaceComponent implements OnInit {
  postIds$: Observable<string[]>;
  space$: Observable<Space | undefined>;
  isMySpace$: Observable<boolean>;
  isAutoExpandSummary: boolean;

  constructor(
    private route: ActivatedRoute,
    private spaceService: SpaceService,
    private postService: PostService,
    private spaceFacade: SpaceFacade,
    private permission: PermissionsService,
    private accountService: AccountService,
    private cd: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    const spaceId$ = this.route.params.pipe(
      map((params) => params['spaceId']),
      shareReplay(1)
    );

    this.space$ = spaceId$.pipe(
      tap((id) => this.spaceFacade.loadSpace(id)),
      switchMap((id) => this.spaceFacade.getSpace(id)),
      filter((space) => !!space)
    );

    this.postIds$ = this.space$.pipe(
      switchMap((space) =>
        from(this.postService.getPostIdsBySpaceId(space!.id))
      ),
      filter((ids) => ids?.length > 0)
    );

    this.isMySpace$ = this.accountService.currentAccount$.pipe(
      withLatestFrom(this.space$),
      filter(([account]) => !!account),
      switchMap(([account, space]) =>
        this.permission.checkIfSpaceOwner(account!.id, space!.id)
      )
    );

    this.isAutoExpandSummary = this.route.snapshot.queryParams['isAutoExpand'];

    this.cd.markForCheck();
  }
}
