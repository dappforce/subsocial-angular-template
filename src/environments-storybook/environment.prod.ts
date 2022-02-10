const baseNodeAddress = 'dev-subsocial.codebridge.tech/';
const baseNodeUrl = 'https://' + baseNodeAddress;

export const environment = {
  baseUrl: 'https://subsocial-storybook-angular.codebridge.tech',
  production: true,
  ipfsUrl: `${baseNodeUrl}ipfs/read/ipfs/`,
  domainUrl: 'http://localhost:4000/',
  appName: 'Subsocial Angular',
  substrateNodeUrl: `wss://${baseNodeAddress}rpc`,
  offchainUrl: `${baseNodeUrl}offchain`,
  addFileUrl: `${baseNodeUrl}offchain/v1/ipfs/addFile`,
  ipfsNodeUrl: `${baseNodeUrl}ipfs/read`,
  currency: 'SUB',
  decimals: 11,
  recommendedSpaceIds: [
    '1001',
    '1002',
    '1003',
    '1004',
    '1005',
    '1006',
    '1017',
    '1018',
  ],
  loadImageLimitMb: 2,
  enableSessionKey: true,
  offchainWs: `wss://${baseNodeUrl}notif-ws`,
};
