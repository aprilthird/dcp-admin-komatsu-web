export class NoExecutedActFakeDB {
  public static NoCompletedActvBarChart = {
    series: [
      {
        name: "Preventivo",
        data: [44, 55],
      },
      {
        name: "Backlog",
        data: [53, 32],
      },
      {
        name: "Camb Comp",
        data: [12, 17],
      },
      {
        name: "Inspección",
        data: [9, 7],
      },
      {
        name: "Lavado",
        data: [25, 10],
      },
      {
        name: "Observaciones",
        data: [14, 7],
      },
      {
        name: "Preventivo",
        data: [25, 15],
      },
      {
        name: "Pre-PM",
        data: [35, 12],
      },
    ],
    chart: {
      type: "bar",
      height: 350,

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
      categories: ["Postergados", "No ejecutados"],
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

  public static BasiBarChartNoExec = {
    colors: ["red", "black"],
    fill: {
      colors: ["red", "black"],
    },
    series: [
      {
        name: "basic",
        data: [400, 300, 220, 65, 400, 300, 220, 65],
      },
    ],
    chart: {
      type: "bar",
      height: 350,
      width: 450,
    },
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: [
        "Preventivo",
        "Backlog",
        "Camb Comp",
        "Inspección",
        "Lavado",
        "Observaciones",
        "Predictivo",
        "Pre-PM",
      ],
    },
  };

  public static BasiBarChartNoExecCausas = {
    colors: ["red", "black"],
    fill: {
      colors: ["red", "black"],
    },
    series: [
      {
        name: "basic",
        data: [400, 300, 220, 65, 400],
      },
    ],
    chart: {
      type: "bar",
      height: 350,
      width: 450,
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: [
        "Priorizar posición de servicio",
        "Priorizar por falla ó condicion de equipo",
        "Falta de recursos Komatsu",
        "Falta de recursos cliente",
        "Priorización de producción",
      ],
    },
  };
}
