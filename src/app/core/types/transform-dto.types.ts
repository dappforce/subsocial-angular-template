import {
  PostStruct,
  ProfileStruct,
  SpaceStruct,
} from '@subsocial/api/flat-subsocial/flatteners';
import { Space } from '../../state/space/space.state';
import { Content } from './content.type';

export type TransformDataArray = {
  structs: Array<SpaceStruct> | Array<PostStruct> | Array<ProfileStruct>;
  contents: Array<Content>;
};

export type TransformData = {
  struct: SpaceStruct | PostStruct;
  content: Content;
};

export type TransformPostWithAllDetails = {
  posts: Array<PostStruct>;
  spaces: Array<Space>;
  profiles: Array<ProfileStruct>;
  contents: Array<Content>;
};
