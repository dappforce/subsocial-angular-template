import { HasId } from '@subsocial/api/flat-subsocial/flatteners';

export type UserInfo = {
  userName?: string;
  avatarSrc?: string;
  address: string;
  isFollowing: boolean;
  balance?: string;
} & HasId;
