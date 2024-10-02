import React from 'react';
import ReactApexChart from 'react-apexcharts';

export function Chart({ label, series}) {
  const chartOptions = {
    chart: {
      type: 'donut',
    },
    labels: label,
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  };

  const chartSeries = series;

  return (
    <div>
      <ReactApexChart options={chartOptions} series={chartSeries} type="donut" />
    </div>
  )
}