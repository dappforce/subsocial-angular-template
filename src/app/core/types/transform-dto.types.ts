import {
  PostStruct,
  ProfileStruct,
  SpaceStruct,
} from '@subsocial/api/flat-subsocial/flatteners';
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
  spaces: Array<SpaceStruct>;
  profiles: Array<ProfileStruct>;
  contents: Array<Content>;
};
