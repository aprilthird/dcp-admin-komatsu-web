export const FakeDispositivosData: DispositivoI[] = [
  {
    dispositivo: "Allicorp",
    bahia_asignada: "Bahia 1",
    fecha_creacion: "12/10/2021",
  },
  {
    dispositivo: "Allicorp",
    bahia_asignada: "Bahia 1",
    fecha_creacion: "12/10/2021",
  },
  {
    dispositivo: "Allicorp",
    bahia_asignada: "Bahia 1",
    fecha_creacion: "12/10/2021",
  },
  {
    dispositivo: "Allicorp",
    bahia_asignada: "Bahia 1",
    fecha_creacion: "12/10/2021",
  },
];

export interface DispositivoI {
  dispositivo: string;
  bahia_asignada: string;
  fecha_creacion: string;
}

export const DispositivoResponse: DispositivoResponseI = {
  sucess: true,
  code: "200",
  body: FakeDispositivosData,
};

export interface DispositivoResponseI {
  sucess: boolean;
  code: any;
  body: DispositivoI[];
}
