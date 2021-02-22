import React, { useState, Component } from 'react';
import Chart from 'chart.js'

class ToneGraph extends Component {

  chartRef = React.createRef()

  componentDidMount() {
    const myChartRef = this.chartRef.current.getContext('2d')

    var ctx = document.getElementById("myChart");
  var myChart = new Chart(ctx, {
  type: 'pie',
  data: {
    labels: this.props.toneLabels,
    datasets: [{
      label: 'Journal Tones',
      data: this.props.toneValues,
      backgroundColor: [
        'rgba(255, 99, 132, 0.5)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)'
      ],
      borderWidth: 1
    }]
  },
  options: {
   	cutoutPercentage: 40,
    responsive: false,
  }
}
  )}

  render() {
    return (
      <div>
        <canvas id="myChart" ref={this.chartRef} />
      </div>
    )
  }
}

export default ToneGraph