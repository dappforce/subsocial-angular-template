import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpaceListItemData } from '../../core/models/space/space-list-item.model';
import { SpaceService } from '../services/space.service';
import { PostService } from '../../post/services/post.service';

@Component({
  selector: 'app-space',
  templateUrl: './space.component.html',
  styleUrls: ['./space.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpaceComponent implements OnInit {
  postIds: string[] = [];
  isAutoExpandSummary: boolean;
  spaceData: SpaceListItemData;

  constructor(
    private route: ActivatedRoute,
    private spaceService: SpaceService,
    private postService: PostService,
    private cd: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    this.isAutoExpandSummary = this.route.snapshot.queryParams['isAutoExpand'];

    await this.loadSpaceData();

    this.cd.markForCheck();
  }

  private async loadSpaceData() {
    const spaceId = await this.getSpaceId();

    this.spaceData = await this.spaceService.getOrFetchSpaceById(spaceId);

    this.postIds = await this.postService.getPostIdsBySpaceId(spaceId);
  }

  private async getSpaceId() {
    const spaceHandle = this.route.snapshot.params['spaceId'];

    let spaceId = spaceHandle;

    if (spaceHandle && spaceHandle[0] === '@') {
      const handle = spaceHandle.substring(1);
      spaceId = await this.spaceService.getSpaceIdByHandle(handle);
    }

    return spaceId;
  }
}
