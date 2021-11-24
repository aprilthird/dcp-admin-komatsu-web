export interface ClaseActividadI {
  nombre: string;
  estado: boolean;
  nestado?: string;
}
export interface TipoMttoI {
  nombre?: string;
  estado: boolean;
  nestado?: string;
  codigo?: string;
}

export interface TipoActividadResponseI {
  nombre: string;
  estado: number;
  idClaseActividad: number;
  filter: {
    idClaseActividad: number;
    tipo: number;
    nombre: string;
  };
}

export interface TipoActividadI {
  estado: number;
  codido: string;
  descripcion: string;
  nombre?: string;
  idClaseActividad: number;
  filter: {
    idClaseActividad: number;
    tipo: number | 8;
    nombre?: string;
  };
}
