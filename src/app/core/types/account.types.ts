import { ProfileData } from '@subsocial/api/flat-subsocial/dto';

export type AccountRawData = {
  accounts: Array<PolkadotAccount>;
  balances: Array<Balance>;
  profiles: Array<ProfileData>;
};

export type PolkadotAccount = {
  address: string;
  name: string;
};

export type Balance = {
  accountId: any;
  freeBalance: any;
};

export type AccountData = {
  id: string;
  balance: string;
  name: string;
  avatar?: string;
};
