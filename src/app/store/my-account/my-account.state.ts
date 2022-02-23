export interface MyAccountState {
  address: string;
  blocked: boolean;
  nonce: number;
  name: string;
}

export const initialMyAccountState: MyAccountState = {
  address: '',
  blocked: false,
  nonce: 0,
  name: '',
};
