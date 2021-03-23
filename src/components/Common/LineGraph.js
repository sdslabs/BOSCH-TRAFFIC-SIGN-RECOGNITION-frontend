import React from 'react'
import { Scatter } from 'react-chartjs-2'

const LineGraph = props => {
  const getData = data => {
    data = data.sort((a, b) => {
      return a.x > b.x ? 1 : -1
    })
    return {
      datasets: [
        {
          label: '1',
          data,
          backgroundColor: '#ffffff',
          borderColor: '#335bc0',
          pointRadius: 0,
          borderWidth: 1.5,
          // lineTension: 0,
          fill: true,
          showLine: true,
        },
        {
          label: '2',
          data: [
            { x: 0, y: 0 },
            { x: 1, y: 1 },
          ],
          backgroundColor: '#ffffff',
          borderColor: '#000000',
          lineTension: 0,
          pointRadius: 0,
          borderWidth: 2,
          fill: true,
          showLine: true,
        },
      ],
    }
  }
  return (
    <div>
      <Scatter
        data={getData(props.data)}
        options={{
          layout: {
            padding: {
              top: 20,
              left: 20,
              right: 80,
              bottom: 20,
            },
          },
          legend: {
            display: false,
          },
          scales: {
            xAxes: [
              {
                scaleLabel: {
                  display: false,
                  labelString: '',
                },
                gridLines: {
                  drawOnChartArea: false,
                  color: '#000000',
                  zeroLineColor: '#000000',
                },
                ticks: {
                  fontColor: '#000000',
                  min: 0,
                },
              },
            ],
            yAxes: [
              {
                scaleLabel: {
                  display: false,
                  labelString: '',
                },
                gridLines: {
                  drawOnChartArea: false,
                  color: '#000000',
                  zeroLineColor: '#000000',
                },
                ticks: {
                  fontColor: '#000000',
                  min: 0,
                },
              },
            ],
          },
        }}
      />
    </div>
  )
}
export default LineGraph
