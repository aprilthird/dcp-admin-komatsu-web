import { environment } from "environments/environment";
import {
  PublicClientApplication,
  IPublicClientApplication,
  InteractionType,
} from "@azure/msal-browser";
import {
  MsalGuardConfiguration,
  MsalInterceptorConfiguration,
} from "@azure/msal-angular";

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: environment.officeTenant.clientIdAzure,
      authority: `${environment.officeTenant.microsoftUri}/${environment.officeTenant.tenantId}`,
      redirectUri: environment.officeTenant.redirectUrl,
      postLogoutRedirectUri: environment.officeTenant.postLogoutRedirectUri,
    },
  });
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  const auth = {
    interactionType: InteractionType.Redirect,
    authRequest: "loginRequest",
    // authRequest: {
    //   scopes: ["user.read"],
    // },
    loginFailedRoute: "/sign-out",
  };
  return auth as MsalGuardConfiguration;
}

// export function MSALInterceptorConfigFactory(
//   conf
// ): MsalInterceptorConfiguration {
//   const protectedResources: Map<string, Array<string>> = new Map([
//     ["https://graph.microsoft.com/v1.0/me", ["user.read"]],
//     ["api", [conf.getSettings("clientIdAzure") + "/user_impersonation"]],
//   ]);

//   return {
//     interactionType: InteractionType.Redirect,
//     protectedResourceMap: protectedResources,
//   };
// }

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  // protectedResourceMap.set('https://graph.microsoft.com/v1.0/me', ['user.read']); // Prod environment. Uncomment to use.
  protectedResourceMap.set("https://graph.microsoft-ppe.com/v1.0/me", [
    "user.read",
  ]);

  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap,
  };
}

export function initializerFactory(env: any): any {
  // APP_INITIALIZER, except a function return which will return a promise
  // APP_INITIALIZER, angular doesnt starts application untill it completes
  const promise = env.init().then((value) => {
    console.log(env.getSettings("clientIdAzure"));
  });
  return () => promise;
}
