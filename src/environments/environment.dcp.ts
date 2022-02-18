// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  project: "dcp",
  title: "DCP",
  apiUrl: "https://development-dcp.ws.solera.pe/api",
  azureAccountName: "appinformes",
  azureContaineName: "dcp",
  azureSas:
    "sv=2020-08-04&ss=bfqt&srt=sco&sp=rwdlacupitfx&se=2022-03-03T23:39:46Z&st=2022-01-03T15:39:46Z&spr=https&sig=BU4Y9BHhsNT4EbY%2FM2eJZ7X9EYdNE4NUC9nbcSwFuc8%3D",

  officeTenant: {
    clientIdAzure: "0fc35dd4-7277-47f9-93a9-3aa381639aba",
    objectIdAzure: "ae4fc3c1-5611-4f37-8aa9-92e0f40e30f0",
    redirectUrl: "https://development-dcp-admin.solera.pe/",
    postLogoutRedirectUri: "https://sib.kmmp.com.pe:446/logout",
    tenantId: "807307b4-6a4c-4b3d-97fd-7c78330bba23",
    microsoftUri: "https://login.microsoftonline.com",
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
