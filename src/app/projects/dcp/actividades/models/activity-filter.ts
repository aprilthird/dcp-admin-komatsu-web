import moment from "moment";
let startDate = moment();

interface GetInbox {
  page: number;
  pageSize: number;
  offset: number;
  next: number;
  filter: {
    id: number;
    tipo?: number;
    fechaInicio?: any;
    fechaFin?: any;
    codigo: string;
    idTipoServicio?: number;
    idEstado?: number;
  };
}

export const getInboxParams: GetInbox = {
  page: 0,
  pageSize: 10,
  offset: 0,
  next: 0,
  filter: {
    id: 0,
    codigo: "",
    fechaFin: startDate.add(1, "d").format("yyyy-MM-DD"),
    fechaInicio: startDate.subtract(14, "days").format("yyyy-MM-DD"),
    idTipoServicio: 0,
    idEstado: 0,
  },
};
