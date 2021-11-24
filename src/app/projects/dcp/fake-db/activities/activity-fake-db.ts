interface ParamsFake {
  type: string;
  title: string;
  created_by: string;
  placeholder: string;
}

interface GroupsFake {
  id: number;
  name: string;
  comments: string;
  params: ParamsFake[];
}

interface SectionsFake {
  id: number;
  name: string;
  groups: GroupsFake[];
}

export interface FormatosFake {
  id: number;
  name: string;
  porcentage: string;
  sections?: SectionsFake[];
  complete: boolean;
}

export interface ActivityFake {
  cliente: string;
  equipo: string;
  modelo: string;
  actividad: string;
  tipo_mantenimiento: string;
  bahia_asignada: string;
  estado: string;
  tipo_solicitud: string;
  id: number;
  formatos: FormatosFake[];
  flota: string;
  tipo_equipo: string;
  descripcion_actividad: string;
  numero_bl: string;
  numero_pe: [
    {
      value: string;
      id: number;
    }
  ];
  numero_os: [
    {
      value: string;
      id: number;
    }
  ];
  fecha_estimada: string;
  duracion: string;
  fecha_hora_inicio: string;
  fecha_hora_fin: string;
  duracion_2: string;
  comentarios_tecnico: string;
  checked?: boolean;
}

export const FormatosData: FormatosFake[] = [
  {
    id: 1,
    name: "FM01",
    complete: true,
    porcentage: "75%",
    sections: [
      {
        id: 1,
        name: "section1",
        groups: [
          {
            id: 1,
            name: "Mantenimiento frontal",
            comments: "",
            params: [
              {
                type: "input",
                title: "Dato",
                created_by: "jlecca",
                placeholder: "Herramienta",
              },
              {
                type: "input",
                title: "Dato 2",
                created_by: "jlecca",
                placeholder: "Herramienta 2",
              },
              {
                type: "input",
                title: "Dato 3",
                created_by: "jlecca",
                placeholder: "Herramienta 3",
              },
              {
                type: "input",
                title: "Dato 4",
                created_by: "jlecca",
                placeholder: "Herramienta 4",
              },
              {
                type: "input",
                title: "Dato 5",
                created_by: "jlecca",
                placeholder: "Herramienta 5",
              },
            ],
          },
          {
            id: 2,
            name: "Mantenimiento frontal 2",
            comments: "",
            params: [
              {
                type: "input",
                title: "Dato",
                created_by: "jlecca",
                placeholder: "Herramienta",
              },
              {
                type: "input",
                title: "Dato 2",
                created_by: "jlecca",
                placeholder: "Herramienta 2",
              },
              {
                type: "input",
                title: "Dato 3",
                created_by: "jlecca",
                placeholder: "Herramienta 3",
              },
              {
                type: "input",
                title: "Dato 4",
                created_by: "jlecca",
                placeholder: "Herramienta 4",
              },
              {
                type: "input",
                title: "Dato 5",
                created_by: "jlecca",
                placeholder: "Herramienta 5",
              },
            ],
          },
        ],
      },

      {
        id: 2,
        name: "section1",
        groups: [
          {
            id: 1,
            name: "Mantenimiento frontal 1",
            comments: "",
            params: [
              {
                type: "input",
                title: "Dato",
                created_by: "jlecca",
                placeholder: "Herramienta",
              },
              {
                type: "input",
                title: "Dato 2",
                created_by: "jlecca",
                placeholder: "Herramienta 2",
              },
              {
                type: "input",
                title: "Dato 3",
                created_by: "jlecca",
                placeholder: "Herramienta 3",
              },
              {
                type: "input",
                title: "Dato 4",
                created_by: "jlecca",
                placeholder: "Herramienta 4",
              },
              {
                type: "input",
                title: "Dato 5",
                created_by: "jlecca",
                placeholder: "Herramienta 5",
              },
            ],
          },
          {
            id: 2,
            name: "Mantenimiento frontal 2",
            comments: "",
            params: [
              {
                type: "input",
                title: "Dato",
                created_by: "jlecca",
                placeholder: "Herramienta",
              },
              {
                type: "input",
                title: "Dato 2",
                created_by: "jlecca",
                placeholder: "Herramienta 2",
              },
              {
                type: "input",
                title: "Dato 3",
                created_by: "jlecca",
                placeholder: "Herramienta 3",
              },
              {
                type: "input",
                title: "Dato 4",
                created_by: "jlecca",
                placeholder: "Herramienta 4",
              },
              {
                type: "input",
                title: "Dato 5",
                created_by: "jlecca",
                placeholder: "Herramienta 5",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "FM02",
    complete: true,
    porcentage: "75%",
    sections: [
      {
        id: 1,
        name: "section1",
        groups: [
          {
            id: 1,
            name: "Mantenimiento frontal",
            comments: "",
            params: [
              {
                type: "input",
                title: "Dato",
                created_by: "jlecca",
                placeholder: "Herramienta",
              },
              {
                type: "input",
                title: "Dato 2",
                created_by: "jlecca",
                placeholder: "Herramienta 2",
              },
              {
                type: "input",
                title: "Dato 3",
                created_by: "jlecca",
                placeholder: "Herramienta 3",
              },
              {
                type: "input",
                title: "Dato 4",
                created_by: "jlecca",
                placeholder: "Herramienta 4",
              },
              {
                type: "input",
                title: "Dato 5",
                created_by: "jlecca",
                placeholder: "Herramienta 5",
              },
            ],
          },
          {
            id: 2,
            name: "Mantenimiento frontal",
            comments: "",
            params: [
              {
                type: "input",
                title: "Dato",
                created_by: "jlecca",
                placeholder: "Herramienta",
              },
              {
                type: "input",
                title: "Dato 2",
                created_by: "jlecca",
                placeholder: "Herramienta 2",
              },
              {
                type: "input",
                title: "Dato 3",
                created_by: "jlecca",
                placeholder: "Herramienta 3",
              },
              {
                type: "input",
                title: "Dato 4",
                created_by: "jlecca",
                placeholder: "Herramienta 4",
              },
              {
                type: "input",
                title: "Dato 5",
                created_by: "jlecca",
                placeholder: "Herramienta 5",
              },
            ],
          },
        ],
      },

      {
        id: 2,
        name: "section1",

        groups: [
          {
            id: 1,
            name: "Mantenimiento frontal 1",
            comments: "",
            params: [
              {
                type: "input",
                title: "Dato",
                created_by: "jlecca",
                placeholder: "Herramienta",
              },
              {
                type: "input",
                title: "Dato 2",
                created_by: "jlecca",
                placeholder: "Herramienta 2",
              },
              {
                type: "input",
                title: "Dato 3",
                created_by: "jlecca",
                placeholder: "Herramienta 3",
              },
              {
                type: "input",
                title: "Dato 4",
                created_by: "jlecca",
                placeholder: "Herramienta 4",
              },
              {
                type: "input",
                title: "Dato 5",
                created_by: "jlecca",
                placeholder: "Herramienta 5",
              },
            ],
          },
          {
            id: 2,
            name: "Mantenimiento frontal 2",
            comments: "",
            params: [
              {
                type: "input",
                title: "Dato",
                created_by: "jlecca",
                placeholder: "Herramienta",
              },
              {
                type: "input",
                title: "Dato 2",
                created_by: "jlecca",
                placeholder: "Herramienta 2",
              },
              {
                type: "input",
                title: "Dato 3",
                created_by: "jlecca",
                placeholder: "Herramienta 3",
              },
              {
                type: "input",
                title: "Dato 4",
                created_by: "jlecca",
                placeholder: "Herramienta 4",
              },
              {
                type: "input",
                title: "Dato 5",
                created_by: "jlecca",
                placeholder: "Herramienta 5",
              },
            ],
          },
        ],
      },
    ],
  },
];

export let Asignaciones: Activity[] = [
  {
    cliente: "Juan Pérez",
    equipo: "Pala hidráulica",
    modelo: "FF541-0",
    actividad: "Preventivo",
    tipo_mantenimiento: "PS01",
    bahia_asignada: "120-A",
    estado: "Sin empezar",
    tipo_solicitud: "Plan",
    id: 1,
    formats: [
      { title: "Formato FM01", complete: true, porcentage: "75%" },
      { title: "Formato FM02", complete: true, porcentage: "75%" },
      { title: "Formato FM03", complete: true, porcentage: "75%" },
      { title: "Formato FM04", complete: false, porcentage: "75%" },
    ],
    flota: "SH01",
    tipo_equipo: "Pala hidráulica",
    descripcion_actividad: "Mantenimeinto preventivo",
    numero_bl: "767YGUYTY",
    numero_pe: [
      {
        value: "F4UH4G5",
        id: 1,
      },
    ],
    numero_os: [
      {
        value: "987DFDF",
        id: 1,
      },
    ],
    fecha_estimada: new Date(),
    duracion: "12",
    fecha_hora_inicio: new Date(),
    fecha_hora_fin: new Date(),
    duracion_2: "12",
    comentarios_tecnico: "Demora leve. Observación HT03 ",
    formatos: FormatosData,
  },
  {
    cliente: "Oscar Fernández",
    equipo: "Pala hidráulica",
    modelo: "FF541-0",
    actividad: "Peventivo",
    tipo_mantenimiento: "PS02",
    bahia_asignada: "120-A",
    estado: "Sin empezar",
    tipo_solicitud: "Plan",
    id: 2,
    formats: [
      { title: "Formato FM01", complete: true, porcentage: "75%" },
      { title: "Formato FM02", complete: true, porcentage: "75%" },
      { title: "Formato FM03", complete: true, porcentage: "75%" },
      { title: "Formato FM04", complete: false, porcentage: "75%" },
    ],
    flota: "SH01",
    tipo_equipo: "Pala hidráulica",
    descripcion_actividad: "Mantenimeinto preventivo",
    numero_bl: "767YGUYTY",
    numero_pe: [
      {
        value: "F4UH4G5",
        id: 1,
      },
    ],
    numero_os: [
      {
        value: "987DFDF",
        id: 1,
      },
    ],
    fecha_estimada: new Date(),
    duracion: "12",
    fecha_hora_inicio: new Date(),
    fecha_hora_fin: new Date(),
    duracion_2: "12",
    comentarios_tecnico: "Demora leve. Observación HT03 ",
    formatos: FormatosData,
  },
  {
    cliente: "Juan Pérez",
    equipo: "Pala hidráulica",
    modelo: "FF541-0",
    actividad: "Peventivo",
    tipo_mantenimiento: "PS02",
    bahia_asignada: "120-A",
    estado: "Sin empezar",
    tipo_solicitud: "Plan",
    id: 3,
    formats: [
      { title: "Formato FM01", complete: true, porcentage: "75%" },
      { title: "Formato FM02", complete: true, porcentage: "75%" },
      { title: "Formato FM03", complete: true, porcentage: "75%" },
      { title: "Formato FM04", complete: false, porcentage: "75%" },
    ],
    flota: "SH01",
    tipo_equipo: "Pala hidráulica",
    descripcion_actividad: "Mantenimeinto preventivo",
    numero_bl: "767YGUYTY",
    numero_pe: [
      {
        value: "F4UH4G5",
        id: 1,
      },
    ],
    numero_os: [
      {
        value: "987DFDF",
        id: 1,
      },
    ],
    fecha_estimada: new Date(),
    duracion: "12",
    fecha_hora_inicio: new Date(),
    fecha_hora_fin: new Date(),
    duracion_2: "12",
    comentarios_tecnico: "Demora leve. Observación HT03 ",
    formatos: FormatosData,
  },
  {
    cliente: "Raúl Jimenez",
    equipo: "Pala hidráulica",
    modelo: "FF541-0",
    actividad: "Peventivo",
    tipo_mantenimiento: "PS02",
    bahia_asignada: "120-A",
    estado: "Sin empezar",
    tipo_solicitud: "Plan",
    id: 4,
    formats: [
      { title: "Formato FM01", complete: true, porcentage: "75%" },
      { title: "Formato FM02", complete: true, porcentage: "75%" },
      { title: "Formato FM03", complete: true, porcentage: "75%" },
      { title: "Formato FM04", complete: false, porcentage: "75%" },
    ],
    flota: "SH01",
    tipo_equipo: "Pala hidráulica",
    descripcion_actividad: "Mantenimeinto preventivo",
    numero_bl: "767YGUYTY",
    numero_pe: [
      {
        value: "F4UH4G5",
        id: 1,
      },
    ],
    numero_os: [
      {
        value: "987DFDF",
        id: 1,
      },
    ],
    fecha_estimada: new Date(),
    duracion: "12",
    fecha_hora_inicio: new Date(),
    fecha_hora_fin: new Date(),
    duracion_2: "12",
    comentarios_tecnico: "Demora leve. Observación HT03 ",
    formatos: FormatosData,
  },
  {
    cliente: "Mario Pérez",
    equipo: "Pala hidráulica",
    modelo: "FF541-0",
    actividad: "Peventivo",
    tipo_mantenimiento: "PS02",
    bahia_asignada: "120-A",
    estado: "Sin empezar",
    tipo_solicitud: "Plan",
    id: 5,
    formats: [
      { title: "Formato FM01", complete: true, porcentage: "75%" },
      { title: "Formato FM02", complete: true, porcentage: "75%" },
      { title: "Formato FM03", complete: true, porcentage: "75%" },
      { title: "Formato FM04", complete: false, porcentage: "75%" },
    ],
    flota: "SH01",
    tipo_equipo: "Pala hidráulica",
    descripcion_actividad: "Mantenimeinto preventivo",
    numero_bl: "767YGUYTY",
    numero_pe: [
      {
        value: "F4UH4G5",
        id: 1,
      },
    ],
    numero_os: [
      {
        value: "987DFDF",
        id: 1,
      },
    ],
    fecha_estimada: new Date(),
    duracion: "12",
    fecha_hora_inicio: new Date(),
    fecha_hora_fin: new Date(),
    duracion_2: "12",
    comentarios_tecnico: "Demora leve. Observación HT03 ",
    formatos: FormatosData,
  },
  {
    cliente: "Cesar Tovar",
    equipo: "Pala hidráulica",
    modelo: "FF541-0",
    actividad: "Peventivo",
    tipo_mantenimiento: "PS02",
    bahia_asignada: "120-A",
    estado: "Sin empezar",
    tipo_solicitud: "Plan",
    id: 5,
    formats: [
      { title: "Formato FM01", complete: true, porcentage: "75%" },
      { title: "Formato FM02", complete: true, porcentage: "75%" },
      { title: "Formato FM03", complete: true, porcentage: "75%" },
      { title: "Formato FM04", complete: false, porcentage: "75%" },
    ],

    flota: "SH01",
    tipo_equipo: "Pala hidráulica",
    descripcion_actividad: "Mantenimeinto preventivo",
    numero_bl: "767YGUYTY",
    numero_pe: [
      {
        value: "F4UH4G5",
        id: 1,
      },
    ],
    numero_os: [
      {
        value: "987DFDF",
        id: 1,
      },
    ],
    fecha_estimada: new Date(),
    duracion: "12",
    fecha_hora_inicio: new Date(),
    fecha_hora_fin: new Date(),
    duracion_2: "12",
    comentarios_tecnico: "Demora leve. Observación HT03 ",
    formatos: FormatosData,
  },
];

export let ActivitiesData: ActivityFake[] = [
  {
    cliente: "Juan Pérez",
    equipo: "Pala hidráulica",
    modelo: "FF541-0",
    actividad: "Preventivo",
    tipo_mantenimiento: "PS01",
    bahia_asignada: "120-A",
    estado: "Sin empezar",
    tipo_solicitud: "Plan",
    id: 1,
    flota: "SH01",
    tipo_equipo: "Pala hidráulica",
    descripcion_actividad: "Mantenimeinto preventivo",
    numero_bl: "767YGUYTY",
    numero_pe: [
      {
        value: "F4UH4G5",
        id: 1,
      },
    ],
    numero_os: [
      {
        value: "987DFDF",
        id: 1,
      },
    ],
    fecha_estimada: "",
    duracion: "12",
    fecha_hora_inicio: "",
    fecha_hora_fin: "",
    duracion_2: "12",
    comentarios_tecnico: "Demora leve. Observación HT03 ",
    formatos: FormatosData,
  },
  {
    cliente: "Oscar Fernández",
    equipo: "Pala hidráulica",
    modelo: "FF541-0",
    actividad: "Peventivo",
    tipo_mantenimiento: "PS02",
    bahia_asignada: "120-A",
    estado: "Sin empezar",
    tipo_solicitud: "Plan",
    id: 2,
    flota: "SH01",
    tipo_equipo: "Pala hidráulica",
    descripcion_actividad: "Mantenimeinto preventivo",
    numero_bl: "767YGUYTY",
    numero_pe: [
      {
        value: "F4UH4G5",
        id: 1,
      },
    ],
    numero_os: [
      {
        value: "987DFDF",
        id: 1,
      },
    ],
    fecha_estimada: "",
    duracion: "12",
    fecha_hora_inicio: "",
    fecha_hora_fin: "",
    duracion_2: "12",
    comentarios_tecnico: "Demora leve. Observación HT03 ",
    formatos: FormatosData,
  },
  {
    cliente: "Juan Pérez",
    equipo: "Pala hidráulica",
    modelo: "FF541-0",
    actividad: "Peventivo",
    tipo_mantenimiento: "PS02",
    bahia_asignada: "120-A",
    estado: "Sin empezar",
    tipo_solicitud: "Plan",
    id: 3,
    flota: "SH01",
    tipo_equipo: "Pala hidráulica",
    descripcion_actividad: "Mantenimeinto preventivo",
    numero_bl: "767YGUYTY",
    numero_pe: [
      {
        value: "F4UH4G5",
        id: 1,
      },
    ],
    numero_os: [
      {
        value: "987DFDF",
        id: 1,
      },
    ],
    fecha_estimada: "",
    duracion: "12",
    fecha_hora_inicio: "",
    fecha_hora_fin: "",
    duracion_2: "12",
    comentarios_tecnico: "Demora leve. Observación HT03 ",
    formatos: FormatosData,
  },
  {
    cliente: "Raúl Jimenez",
    equipo: "Pala hidráulica",
    modelo: "FF541-0",
    actividad: "Peventivo",
    tipo_mantenimiento: "PS02",
    bahia_asignada: "120-A",
    estado: "Sin empezar",
    tipo_solicitud: "Plan",
    id: 4,
    flota: "SH01",
    tipo_equipo: "Pala hidráulica",
    descripcion_actividad: "Mantenimeinto preventivo",
    numero_bl: "767YGUYTY",
    numero_pe: [
      {
        value: "F4UH4G5",
        id: 1,
      },
    ],
    numero_os: [
      {
        value: "987DFDF",
        id: 1,
      },
    ],
    fecha_estimada: "",
    duracion: "12",
    fecha_hora_inicio: "",
    fecha_hora_fin: "",
    duracion_2: "12",
    comentarios_tecnico: "Demora leve. Observación HT03 ",
    formatos: FormatosData,
  },
  {
    cliente: "Mario Pérez",
    equipo: "Pala hidráulica",
    modelo: "FF541-0",
    actividad: "Peventivo",
    tipo_mantenimiento: "PS02",
    bahia_asignada: "120-A",
    estado: "Sin empezar",
    tipo_solicitud: "Plan",
    id: 5,
    flota: "SH01",
    tipo_equipo: "Pala hidráulica",
    descripcion_actividad: "Mantenimeinto preventivo",
    numero_bl: "767YGUYTY",
    numero_pe: [
      {
        value: "F4UH4G5",
        id: 1,
      },
    ],
    numero_os: [
      {
        value: "987DFDF",
        id: 1,
      },
    ],
    fecha_estimada: "",
    duracion: "12",
    fecha_hora_inicio: "",
    fecha_hora_fin: "",
    duracion_2: "12",
    comentarios_tecnico: "Demora leve. Observación HT03 ",
    formatos: FormatosData,
  },
  {
    cliente: "Cesar Tovar",
    equipo: "Pala hidráulica",
    modelo: "FF541-0",
    actividad: "Peventivo",
    tipo_mantenimiento: "PS02",
    bahia_asignada: "120-A",
    estado: "Sin empezar",
    tipo_solicitud: "Plan",
    id: 5,
    flota: "SH01",
    tipo_equipo: "Pala hidráulica",
    descripcion_actividad: "Mantenimeinto preventivo",
    numero_bl: "767YGUYTY",
    numero_pe: [
      {
        value: "F4UH4G5",
        id: 1,
      },
    ],
    numero_os: [
      {
        value: "987DFDF",
        id: 1,
      },
    ],
    fecha_estimada: "",
    duracion: "12",
    fecha_hora_inicio: "",
    fecha_hora_fin: "",
    duracion_2: "12",
    comentarios_tecnico: "Demora leve. Observación HT03 ",
    formatos: FormatosData,
  },
];

export interface Activity {
  cliente: string;
  equipo: string;
  modelo: string;
  actividad: string;
  tipo_mantenimiento: string;
  bahia_asignada: string;
  estado: string;
  tipo_solicitud: string;
  checked?: boolean;
  id: number;
  formats?: any;
  flota?: string;
  tipo_equipo?: string;
  descripcion_actividad?: string;
  numero_bl?: string;
  numero_pe?: any;
  numero_os?: any;
  fecha_estimada?: Date;
  duracion?: string;
  fecha_hora_inicio?: Date;
  fecha_hora_fin?: Date;
  duracion_2?: string;
  comentarios_tecnico?: string;
  formatos?: any;
}
