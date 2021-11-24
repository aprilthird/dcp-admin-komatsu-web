export const FakeDocumentosData: DocumentoI[] = [
  {
    nombre: "Allicorp",
    cliente: "Plaza Vea",
    modelo: "Allicorp",
    actividad: "Plaza Vea",
    documento: "Allicorp",
    tipo_mantenimeinto: "Plaza Vea",
    estado: false,
  },
  {
    nombre: "Allicorp",
    cliente: "Plaza Vea",
    modelo: "Allicorp",
    actividad: "Plaza Vea",
    documento: "Allicorp",
    tipo_mantenimeinto: "Plaza Vea",
    estado: false,
  },
  {
    nombre: "Allicorp",
    cliente: "Plaza Vea",
    modelo: "Allicorp",
    actividad: "Plaza Vea",
    documento: "Allicorp",
    tipo_mantenimeinto: "Plaza Vea",
    estado: false,
  },
  {
    nombre: "Allicorp",
    cliente: "Plaza Vea",
    modelo: "Allicorp",
    actividad: "Plaza Vea",
    documento: "Allicorp",
    tipo_mantenimeinto: "Plaza Vea",
    estado: false,
  },
];

export interface DocumentoI {
  nombre: string;
  cliente: string;
  modelo: string;
  actividad: string;
  tipo_mantenimeinto: string;
  documento: string;
  estado: boolean;
}

export const DocumentoResponse: DocumentoResponseI = {
  sucess: true,
  code: "200",
  body: FakeDocumentosData,
};

export interface DocumentoResponseI {
  sucess: boolean;
  code: any;
  body: DocumentoI[];
}
