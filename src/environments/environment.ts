// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  title: "DCP",
  project: "dcp",
  apiUrl: "https://development-kmp.ws.solera.pe/api",
  azureAccountName: "appinformes",
  azureContaineName: "pictures",
  azureSas:
    "sp=racwdl&st=2021-10-05T16:07:46Z&se=2022-10-06T00:07:46Z&sv=2020-08-04&sr=c&sig=9MTq3NunBV%2B4lsFQ3S2KcCZkojTMh%2Frx5jrJRdouwvE%3D",
  config: {
    layout: "classy",
    scheme: "light",
    theme: "brand",
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
