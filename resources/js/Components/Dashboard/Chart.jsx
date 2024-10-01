import React from 'react';
import ReactApexChart from 'react-apexcharts';

export function Chart() {
  const chartOptions = {
    chart: {
      type: 'donut',
    },
    labels: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni'],
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

  const chartSeries = [65, 59, 80, 81, 56, 55];

  return (
    <div>
      <ReactApexChart options={chartOptions} series={chartSeries} type="donut" />
    </div>
  )
}