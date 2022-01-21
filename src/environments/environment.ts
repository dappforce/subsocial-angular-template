// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const baseNodeAddress = 'dev-subsocial.codebridge.tech/';
const baseNodeUrl = 'https://' + baseNodeAddress;

export const environment = {
  baseUrl: 'http://localhost:4200',
  production: false,
  ipfsUrl: `${baseNodeUrl}ipfs/read/ipfs/`,
  domainUrl: 'http://localhost:4200/',
  appName: 'Subsocial Angular',
  substrateNodeUrl: `wss://${baseNodeAddress}rpc`,
  offchainUrl: `${baseNodeUrl}offchain`,
  offchainWs: `wss://${baseNodeUrl}notif-ws`,
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
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
