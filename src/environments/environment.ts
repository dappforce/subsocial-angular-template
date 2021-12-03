// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  ipfsUrl: 'https://app.subsocial.network/ipfs/ipfs/',
  domainUrl: 'http://localhost:4200/',
  appName: 'Subsocial Angular',
  substrateNodeUrl: 'wss://rpc.subsocial.network',
  offchainUrl: 'https://app.subsocial.network/offchain',
  ipfsNodeUrl: 'https://staging.subsocial.network/ipfs-1',
  currency: 'SUB',
  decimals: 11,
  recommendedSpaceIds: [
    '1',
    '1354',
    '1573',
    '1599',
    '1040',
    '1624',
    '1625',
    '2425',
    '1162',
    '1141',
    '1049',
    '1163',
    '1036',
    '1042',
    '1265',
    '1238',
    '1224',
    '1731',
    '1998',
    '2984',
    '1421',
    '1442',
    '1231',
    '1273',
    '1115',
    '1112',
    '1002',
    '1013',
    '4306',
    '4544',
  ],
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
