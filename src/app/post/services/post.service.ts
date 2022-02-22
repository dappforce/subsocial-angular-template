import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { LinkService } from '../../shared/services/link.service';
import { SubsocialApiService } from '../../shared/services/subsocial-api.service';
import { METHODS, PALLETS } from '../../core/constants/query.const';
import { flatReaction } from '../../core/mapper/flatten.map';
import { ConvertService } from '../../shared/services/convert.service';
import { StoreService } from '../../store/store.service';
import { Post } from '../../core/models/post/post-list-item.model';
import { mapPostDTOToPost } from '../../core/mapper/post.map';
import { PostId } from '@subsocial/types/substrate/interfaces';
import { PostWithAllDetails } from '@subsocial/types/dto';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  spaceIds = environment.recommendedSpaceIds;
  constructor(
    private http: HttpClient,
    private link: LinkService,
    private api: SubsocialApiService,
    private convert: ConvertService,
    private storeService: StoreService
  ) {}

  getSuggestedPostsIds() {
    return this.getPostIdsBySpaceIds(this.spaceIds);
  }

  getPostIdsBySpaceIds(spaceIds: string[]): Observable<string[]> {
    const allIds$: Observable<PostId[]>[] = [];
    spaceIds.forEach((id) => {
      allIds$.push(
        from(
          this.api.api.subsocial.substrate.postIdsBySpaceId(
            this.convert.idToBn(id)
          )
        )
      );
    });

    return forkJoin(allIds$).pipe(
      map((postIds) => {
        return postIds
          .flat()
          .sort((a, b) => b.sub(a).toNumber())
          .map((id) => id.toString());
      })
    );
  }

  async getPostIdsBySpaceId(id: string) {
    const ids = await this.api.api.subsocial.substrate.postIdsBySpaceId(
      this.convert.idToBn(id)
    );
    return ids.sort((a, b) => b.sub(a).toNumber()).map((id) => id.toString());
  }

  async loadPostsByIds(
    ids: string[],
    type: 'public' | 'all' = 'public'
  ): Promise<Post[]> {
    const postsData =
      type === 'public'
        ? await this.findPublicPostsWithAllDetails(ids)
        : await this.findPostsWithAllDetails(ids);

    return this.mapPostsDTO(postsData);
  }

  async loadPostById(
    id: string,
    type: 'public' | 'all' = 'public'
  ): Promise<Post | undefined> {
    const postsData =
      type === 'public'
        ? await this.findPublicPostsWithAllDetails([id])
        : await this.findPostsWithAllDetails([id]);

    if (postsData[0]) {
      const { post, space, owner } = postsData[0];

      return mapPostDTOToPost(post, space, owner?.content);
    }

    return undefined;
  }

  async findPublicPostsWithAllDetails(ids: string[]) {
    return await this.api.api.findPublicPostsWithAllDetails(ids);
  }

  async findPostsWithAllDetails(ids: string[]) {
    return await this.api.api.findPostsWithAllDetails({
      ids: this.convert.idsToBns(ids),
    });
  }

  async getReactionIdsByPostId(id: string) {
    return await this.api.getSubstrateIdsById({
      pallet: PALLETS.reactions,
      method: METHODS.reactionIdsByPostId,
      id,
    });
  }

  async getReactionsByIds(ids: string[]) {
    const reactions = await this.api.api.subsocial.substrate.findReactions(
      this.convert.idsToBns(ids)
    );

    return reactions.map((reaction) => flatReaction(reaction));
  }

  public mapPostsDTO(postsAllData: PostWithAllDetails[]): Post[] {
    const posts: Post[] = [];

    postsAllData.forEach((postAllData) => {
      const { post, space, owner } = postAllData;

      if (post?.content) {
        posts.push(mapPostDTOToPost(post, space, owner?.content));
      }
    });

    return posts;
  }
}
