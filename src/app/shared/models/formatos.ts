export interface CreateGrupoI {
  idFormato?: number;
  idSeccion?: number;
  parametros?: any;
  pos?: string;
  nombre?: string;
  id?: number;
  activo?: boolean;
}

export interface ParamI {
  index?: number;
  indexSeccion?: number;
  indexGrupo?: number;
  idAsignacion?: number;
  idAsignacionDetalle?: number;
  idAsignacionFormato?: number;
  idFormato?: number;
  idSeccion?: number;
  idGrupo?: number;
  idParametro?: number;
  idParametroGrupo?: number;
  label?: string;
  dato?: string;
  tipoNombre?: string;
  valor?: string;
  placeholder?: string;
  obligatorio?: true;
  editable?: true;
  minCaracteres?: number;
  maxCaracteres?: number;
  regex?: string;
  fileBase64?: string;
  fila?: number;
  columna?: number;
  tipo?: number;
  observado?: boolean;
  idUsuarioObservado?: number;
  formatoValido?: boolean;
  estadoFormatoValido?: number;
  seccionValida?: boolean;
  estadoSeccionValido?: number;
  comentarios?: string;
  observar?: boolean;
  id?: number;
  codigo?: string;
  nombre?: string;
  descripcion?: string;
  visible?: boolean;
  activo?: boolean;
  asignado?: boolean;
  estado?: number;
  nestado?: string;
  subEstado?: number;
  fechaReg?: string;
  fechaMod?: string;
  usuarioMod?: string;
  usuarioReg?: string;
  idUsuarioReg?: number;
  idUsuarioMod?: number;
  entidad?: number;
  total?: number;
}

export interface GroupI {
  index?: number;
  pos?: string;
  idSeccion?: number;
  parametros?: ParamI;
  id?: number;
  codigo?: string;
  nombre?: string;
  descripcion?: string;
  visible?: boolean;
  activo?: boolean;
  asignado?: boolean;
  estado?: number;
  nestado?: string;
  subEstado?: number;
  fechaReg?: string;
  fechaMod?: string;
  usuarioMod?: string;
  usuarioReg?: string;
  idUsuarioReg?: number;
  idUsuarioMod?: number;
  entidad?: number;
  total?: number;
}

export const GeneralParams = {
  idParametro: 1,
  placeholder: "Ingrese texto",
  visible: true,
  obligatorio: true,
  editable: true,
  minCaracteres: 1,
  maxCaracteres: 100,
  regex: "",
  idParametroGrupo: 0,
  activo: true,
};
