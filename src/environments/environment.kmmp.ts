// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  project: "kmmp",
  title: "KMMP",
  apiUrl: "https://development-kmp.ws.solera.pe/api",
  azureAccountName: "appinformes",
  azureContaineName: "dcp",
  azureSas:
    "sv=2020-08-04&ss=bfqt&srt=sco&sp=rwdlacuptfx&se=2021-12-31T07:16:26Z&st=2021-09-08T23:16:26Z&spr=https&sig=r%2FrSo5JcaI1s1jNk106fmzYZ6XckWARBRIrodzJyNwo%3D",

  officeTenant: {
    clientIdAzure: "86ffa81e-63f7-4a10-99f8-9a4626f6d4f4",
    objectIdAzure: "5afa3854-9235-4475-b8a1-42a769914613",
    redirectUrl: "https://development-kmmp-admin.solera.pe/",
    postLogoutRedirectUri: "https://development-kmmp-admin.solera.pe/",
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
