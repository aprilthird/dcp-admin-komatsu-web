import { NavigationEnd } from "@angular/router";
import { uiConfig } from "app/shared/ui/config";

export function validateShrinkScreen(val: NavigationEnd) {
  return (
    val.url !== uiConfig.paths.dashboard &&
    !val.url.includes(uiConfig.paths.createUser) &&
    !val.url.includes(uiConfig.paths.editUser)
  );
}

export function validateRenderShrinkScreen(url: string) {
  return (
    url == uiConfig.paths.dashboard ||
    url.includes(uiConfig.paths.createUser) ||
    url.includes(uiConfig.paths.editUser)
  );
}
