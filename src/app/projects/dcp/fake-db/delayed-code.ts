export class DelayCode {
  public static DelayedCode = {
    series: [
      {
        name: "Demora en ejecución de PM",
        data: [44],
      },
      {
        name: "Demora en ejecución de PM",
        data: [53],
      },
      {
        name: "Demora por traslado de equipo",
        data: [12],
      },
      {
        name: "Falta de grúa",
        data: [9],
      },
      {
        name: "Activación de sistema contra incendio",
        data: [25],
      },
      {
        name: "Falta de insumos",
        data: [14],
      },
      {
        name: "Neumáticos",
        data: [25],
      },
      {
        name: "Sistema Dispatch",
        data: [35],
      },
    ],
    chart: {
      type: "bar",
      height: 350,
      width: 950,

      stacked: true,
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    stroke: {
      width: 1,
      colors: ["#fff"],
    },
    title: {
      text: "Fiction Books Sales",
    },
    xaxis: {
      categories: ["Detalle de falla"],
      labels: {
        formatter: function (val) {
          return val + "K";
        },
      },
    },
    yaxis: {
      title: {
        text: undefined,
      },
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + "K";
        },
      },
    },
    fill: {
      opacity: 1,
    },
    legend: {
      position: "top",
      horizontalAlign: "left",
      offsetX: 40,
    },
  };
}
