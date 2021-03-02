import React from 'react'
import { Pie } from 'react-chartjs-2';

const PieChart = ({toneValues, toneLabels}) => {
  const options = {
      legend: {
        position: 'left'
      }
    }
  const data = {
    labels: toneLabels,
    datasets: [
      {
        label: 'Tone of dream',
        data: toneValues,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }
  return (
    <canvas data-testid='pieGraph'>
      <Pie
        data={data}
        options={options}
        height={60}
        width={100}
      />
    </canvas>
  );
}

export default PieChart;