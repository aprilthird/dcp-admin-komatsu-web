export const environment = {
  production: true,
  project: "dcp",
  title: "DCP",
  apiUrl: "https://appsvcappinformesdcpapi.azurewebsites.net/api",
  azureAccountName: "saappinformesprd",
  azureContaineName: "dcp",
  azureSas:
    //"sv=2020-08-04&ss=bfqt&srt=sco&sp=rwdlacupitfx&se=2022-03-03T23:39:46Z&st=2022-01-03T15:39:46Z&spr=https&sig=BU4Y9BHhsNT4EbY%2FM2eJZ7X9EYdNE4NUC9nbcSwFuc8%3D",
    "sv=2020-08-04&ss=bfqt&srt=sco&sp=rwdlacupitfx&se=2027-02-02T01:49:24Z&st=2022-03-14T17:49:24Z&spr=https&sig=P09pDRYwsgAd%2B%2BbAf3PiOdmQM8S%2F7UUn99iugWCKPtM%3D",

  officeTenant: {
    clientIdAzure: "258d57fc-347b-4b30-8c99-4e8a0abd3ccb",
    //objectIdAzure: "ad5d0da5-a703-4e32-973e-e9358533a4a8",
    redirectUrl: "https://appinformes.cumminsperu.pe/",
    postLogoutRedirectUri: "https://appinformes.cumminsperu.pe/",
    tenantId: "807307b4-6a4c-4b3d-97fd-7c78330bba23",
    microsoftUri: "https://login.microsoftonline.com",
  },
};
