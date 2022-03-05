export function initPath(): string {
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  let firstURL = "admin/informes/list";
  if (permissions) {
    firstURL = Object.keys(permissions)[0] || "admin/informes/list";
  }
  return firstURL;
}

export function initPathToRedirect(): string {
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  let firstURL = "signed-in-redirect";
  if (permissions) {
    firstURL = Object.keys(permissions)[0] || "signed-in-redirect";
  }
  return firstURL;
}
