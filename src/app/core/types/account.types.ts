import { ProfileData } from '@subsocial/types/dto';

export type AccountRawData = {
  accounts: Array<PolkadotAccount>;
  balances: Array<Balance>;
  profiles: Array<ProfileData>;
};

export type PolkadotAccount = {
  address: string;
  meta: {
    name: string;
  };
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
