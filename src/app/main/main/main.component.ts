import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NavigationService } from '../../shared/services/navigation.service';
import { environment } from '../../../environments/environment';
import { PostService } from '../../post/services/post.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject();
  spaceIds = environment.recommendedSpaceIds;
  postIds: string[] = [];
  constructor(
    public navService: NavigationService,
    private route: ActivatedRoute,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.navService.showTab();
    const initTab = this.route.snapshot.queryParams['tab'];
    initTab
      ? this.navService.switchTab(
          this.navService.tabLinks.find((tab) => tab.tabName === initTab) ||
            this.navService.tabLinks[0]
        )
      : this.navService.switchTab(this.navService.tabLinks[0]);

    this.postService
      .getSuggestedPostsIds()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((ids) => (this.postIds = ids));
  }

  ngOnDestroy(): void {
    this.navService.hideTab();
    this.unsubscribe$?.next();
    this.unsubscribe$?.complete();
  }
}
