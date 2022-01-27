import { SpaceData } from '@subsocial/api/flat-subsocial/dto';
import { Space } from '../../state/space/space.state';

export const mapSpaceDTOToSpace = (spaceData: SpaceData) => {
  return {
    id: spaceData.struct.id,
    ownerId: spaceData.struct.ownerId,
    isHidden: spaceData.struct.hidden,
    name: spaceData.content?.name,
    image: spaceData.content?.image,
    followersCount: spaceData.struct.followersCount,
    postsCount: spaceData.struct.postsCount,
    spaceLink: '/' + spaceData.struct.id,
    summary: spaceData.content?.summary,
    about: spaceData.content?.about,
    isShowMore: spaceData.content?.isShowMore,
    tags: spaceData.content?.tags,
    links: spaceData.content?.links,
  } as Space;
};