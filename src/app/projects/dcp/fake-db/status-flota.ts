export class FlotaDataFakeDB {
  public static AllStatusXFlota = {
    colors: ["#E91E63", "#FF9800"],
    series: [
      {
        name: "Ejecutado",
        data: [44, 55, 57, 56],
      },
      {
        name: "No ejecutado",
        data: [76, 85, 101, 98],
      },
      {
        name: "Postergado",
        data: [35, 41, 36, 26],
      },
    ],
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: ["Auxiliar", "Camiones", "Palas", "Cargadores WA800"],
    },
    yaxis: {
      title: {
        text: "$ (thousands)",
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return "$ " + val + " thousands";
        },
      },
    },
  };

  public static SingleStatusXFlota = {
    series: [44, 55],
    chart: {
      type: "donut",
      width: 450,
      height: 350,
    },
    labels: ["Ejecutado", "No ejecutado"],
    position: "bottom",
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  public static BasiBarChart = {
    colors: ["red", "black"],
    fill: {
      colors: ["red", "black"],
    },
    series: [
      {
        name: "basic",
        data: [400, 300, 220, 65],
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
      categories: ["Validada", "Observada", "En progreso", "Sin empezar"],
    },
  };
}
