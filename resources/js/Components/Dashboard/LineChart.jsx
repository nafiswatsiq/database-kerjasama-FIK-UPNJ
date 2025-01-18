import ReactApexChart from "react-apexcharts";

export default function LineChart({ dataSeries, dataCategories }) {
  const series = [{
    name: '',
    // data: Object.values(dataSeries)
    data: dataSeries
  }]

  const options = {
    chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    xaxis: {
      // categories: sries,
      categories: dataCategories
    }
  }

  return (
    <div>
      <ReactApexChart options={options} series={series} type="line" height={350} />
    </div>
  )
}