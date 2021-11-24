export interface Formato {
  activo: boolean;
  descripcion: string;
  estado: number;
  fechaMod: string;
  fechaReg: string;
  id: number;
  nombre: string;
  visible: boolean;
}

export interface Seccion {
  activo: boolean;
  descripcion: string;
  estado: number;
  fechaMod: string;
  fechaReg: string;
  id: number;
  idFormato: number;
  nombre: string;
  visible: boolean;
}

export enum TipoParametro {
  "",
  "TEXTO",
  "NUMERICO",
  "AREA_TEXTO",
  "UPLOAD",
  "FECHA",
  "IMAGEN",
  "FIRMA",
  "LABEL",
  "CHECKBOX",
  "SELECCION",
}

export enum GrupoPosicion {
  "h" = "h",
  "v" = "v",
}

export interface Parametro {
  activo: boolean;
  columna: number;
  dato: string;
  descripcion: string;
  editable: boolean;
  estado: number;
  fechaMod: string;
  fechaReg: string;
  fila: number;
  id: number;
  idGrupo: number;
  idParametro: number;
  idParametroGrupo: number;
  label: string;
  maxCaracteres: number;
  minCaracteres: number;
  nombre: number;
  obligatorio: boolean;
  placeholder: string;
  regex: string;
  total: number;
  visible: boolean;
}

export interface Grupo {
  descripcion: string;
  estado: number;
  fechaMod: string;
  fechaReg: string;
  id: number;
  idSeccion: number;
  nombre: string;
  parametros: Parametro[];
  pos: GrupoPosicion;
  total: 0;
  visible: true;
}
