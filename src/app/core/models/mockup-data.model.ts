import {ContentEntity} from "../entities/content-entity.model";
import {KeyValuePair} from "./key-value-pair.model";
import {ProfileEntity} from "../entities/profile-entity.model";
import {SpaceEntity} from "../entities/space-entity.model";
import {PostEntity} from "../entities/post-entity.model";

export interface MockupData {
  contents: KeyValuePair<ContentEntity>;
  profiles: KeyValuePair<ProfileEntity>;
  spaces: KeyValuePair<SpaceEntity>;
  posts: KeyValuePair<PostEntity>;
}
