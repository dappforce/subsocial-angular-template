import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { LinkService } from '../../shared/services/link.service';
import { SubsocialApiService } from '../../shared/services/subsocial-api.service';
import { PostId } from '@subsocial/types/substrate/interfaces';
import { transformEntityDataArray } from '../../core/utils';
import { PostWithAllDetails } from '@subsocial/api/flat-subsocial/dto';
import {
  PostStruct,
  ProfileStruct,
  SpaceStruct,
} from '@subsocial/api/flat-subsocial/flatteners';
import { Content } from '../../core/types/content.type';
import { TransformPostWithAllDetails } from '../../core/types/transform-dto.types';
import { METHODS, PALLETS } from '../../core/constants/query.const';
import { flatReaction } from '../../core/mapper/flatten.map';
import { ConvertService } from '../../shared/services/convert.service';
import { StoreService } from '../../state/store.service';
import { selectPostWithAllDetailsById } from '../../state/post/post.selectors';
import { getPostsByIds, loadPostsSuccess } from '../../state/post/post.actions';

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

  async getOrLoadPost(id: string, type: 'all' | 'public' = 'public') {
    const loadProps = {
      payload: {
        ids: [id],
        type,
      },
    };

    return await this.storeService.getOrLoadEntities(
      selectPostWithAllDetailsById,
      getPostsByIds,
      loadPostsSuccess,
      id,
      loadProps
    );
  }

  getSuggestedPostsIds() {
    return this.getPostIdsBySpaceIds(this.spaceIds);
  }

  getPostIdsBySpaceIds(spaceIds: string[]): Observable<string[]> {
    const allIds$: Observable<PostId[]>[] = [];
    spaceIds.forEach((id) => {
      allIds$.push(
        from(
          this.api.api.subsocial.substrate.postIdsBySpaceId(
            this.convert.convertToBN(id)
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
      this.convert.convertToBN(id)
    );
    return ids.sort((a, b) => b.sub(a).toNumber()).map((id) => id.toString());
  }

  async getFlatPostsByIds(ids: string[]) {
    const anyPostId = this.convert.convertToBNArray(ids);
    const postsData = await this.api.api.findPublicPosts(anyPostId);
    return transformEntityDataArray(postsData);
  }

  async getPostsWithAllData(
    ids: string[],
    type: 'public' | 'all' = 'public'
  ): Promise<TransformPostWithAllDetails> {
    const postsData =
      type === 'public'
        ? await this.findPublicPostsWithAllDetails(ids)
        : await this.findPostsWithAllDetails(ids);

    return this.splitPostWithAllDataByEntity(postsData);
  }

  async findPublicPostsWithAllDetails(ids: string[]) {
    return await this.api.api.findPublicPostsWithAllDetails(
      this.convert.convertToBNArray(ids)
    );
  }

  async findPostsWithAllDetails(ids: string[]) {
    return await this.api.api.findPostsWithAllDetails({
      ids: this.convert.convertToBNArray(ids),
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
      this.convert.convertToBNArray(ids)
    );

    return reactions.map((reaction) => flatReaction(reaction));
  }

  public splitPostWithAllDataByEntity(
    postsAllData: PostWithAllDetails[]
  ): TransformPostWithAllDetails {
    const posts: PostStruct[] = [];
    const spaces: SpaceStruct[] = [];
    const profiles: ProfileStruct[] = [];
    const contents: Content[] = [];

    postsAllData.forEach((postAllData) => {
      const { post, space, owner } = postAllData;

      if (post?.content && space?.content) {
        posts.push(post.struct);
        spaces.push(space.struct);

        const postContent = post.content as Content;
        postContent['id'] = post.struct.contentId!;

        const spaceContent = space.content as Content;
        spaceContent['id'] = space.struct.contentId!;

        contents.push(postContent, spaceContent);
      }

      if (owner?.content) {
        profiles.push(owner.struct);
        const profileContent = owner.content as Content;
        profileContent['id'] = owner.struct.contentId!;
        contents.push(profileContent);
      }
    });

    return { posts, contents, profiles, spaces };
  }
}
