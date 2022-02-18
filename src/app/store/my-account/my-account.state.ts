export interface MyAccountState {
  address: string;
  blocked: boolean;
  nonce: number;
}

export const initialMyAccountState: MyAccountState = {
  address: '',
  blocked: false,
  nonce: 0,
};
