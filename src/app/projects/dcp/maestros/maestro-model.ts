interface GetInbox {
  page: number | 0;
  pageSize: number | 10;
  offset: number | 0;
  next: number | 0;
  filter: {
    id: number;
    idUsuario: number;
    dni: string;
    nombre: string;
    estado: number | 1;
    tipo: number;
    fechaIni: any | "";
    fechaFin: any | "";
    codigo: string | "";
  };
}

export const getInboxParams: GetInbox = {
  page: 0,
  pageSize: 10,
  offset: 0,
  next: 0,
  filter: {
    id: 0,
    idUsuario: 0,
    dni: "",
    nombre: "",
    estado: 0,
    tipo: 1,
    fechaIni: null,
    fechaFin: null,
    codigo: "",
  },
};
