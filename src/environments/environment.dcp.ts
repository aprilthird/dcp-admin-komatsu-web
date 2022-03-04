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
    //"sv=2020-08-04&ss=bfqt&srt=sco&sp=rwdlacupitfx&se=2022-03-03T23:39:46Z&st=2022-01-03T15:39:46Z&spr=https&sig=BU4Y9BHhsNT4EbY%2FM2eJZ7X9EYdNE4NUC9nbcSwFuc8%3D",
    "sv=2020-08-04&ss=bfqt&srt=sco&sp=rwdlacupitfx&se=2023-02-02T02:21:05Z&st=2022-03-04T18:21:05Z&spr=https&sig=Caxkk4vUhpZkJMo9R9SvKq1BHdNwOOsjunR%2BCeBKlFg%3D",

  officeTenant: {
    clientIdAzure: "df3c881e-0c3f-457e-a355-8d8d0d61ea1c",
    objectIdAzure: "ad5d0da5-a703-4e32-973e-e9358533a4a8",
    redirectUrl: "https://development-dcp-admin.solera.pe/",
    postLogoutRedirectUri: "https://development-dcp-admin.solera.pe/",
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
