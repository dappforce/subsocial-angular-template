import { HasId } from '@subsocial/types/dto';

export type UserInfo = {
  userName?: string;
  avatarSrc?: string;
  address: string;
  isFollowing: boolean;
  balance?: string;
} & HasId;
