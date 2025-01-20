import ReactApexChart from "react-apexcharts";

export default function BarChart({ dataSeries, dataCategories, horizontal, height }){
  const series = [{
    name: '',
    // data: [2, 3, 4, 10, 4, 3, 3, 2, 1, 8]
    data: Object.values(dataSeries)
  }]

  const options = {
    chart: {
      height: 350,
      type: 'bar',
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        dataLabels: {
          position: 'top', // top, center, bottom
        },
        horizontal: horizontal,
      }
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val + "";
      },
      offsetY: -20,
      style: {
        fontSize: '12px',
        colors: ["#304758"]
      }
    },
    
    xaxis: {
      categories: dataCategories,
      position: 'bottom',
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      crosshairs: {
        fill: {
          type: 'gradient',
          gradient: {
            colorFrom: '#D8E3F0',
            colorTo: '#BED1E6',
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          }
        }
      },
      tooltip: {
        enabled: true,
      }
    },
    yaxis: {
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: true,
        formatter: function (val) {
          return val + "";
        }
      }
    
    },
    title: {
      // text: 'Monthly Inflation in Argentina, 2002',
      floating: true,
      offsetY: 330,
      align: 'center',
      style: {
        color: '#444'
      }
    }
  }

  return (
    <div>
      <ReactApexChart options={options} series={series} type="bar" height={height ?? 500} />
    </div>
  )
}