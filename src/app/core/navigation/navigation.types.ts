import { FuseNavigationItem } from "@fuse/components/navigation";

export interface Navigation {
  compact: FuseNavigationItem[];
  default: FuseNavigationItem[];
  futuristic: FuseNavigationItem[];
  horizontal: FuseNavigationItem[];
}

export const fakeDcpNavigation = [
  {
    id: 0,
    title: "Bandeja de informes",
    type: "basic",
    link: "/admin/informes/list",
  },
  {
    id: 0,
    title: "Servicios",
    type: "basic",
    link: "/admin/formatos",
  },
  {
    id: 0,
    title: "Tipo de servicios",
    type: "basic",
    link: "/admin/tipos_servicios",
  },
  {
    id: 0,
    title: "Usuarios",
    type: "basic",
    link: "/admin/ajustes/usuarios",
  },
];
