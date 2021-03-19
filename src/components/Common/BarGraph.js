import React from 'react'
import { Bar } from 'react-chartjs-2'

const BarGraph = props => {
  let data = {
    labels: props.labels,
    datasets: [
      {
        backgroundColor: '#335bc0',
        borderColor: '#335bc0',
        data: props.data,
        borderWidth: 5,
      },
    ],
  }
  if (props.isHistogram) {
    data = {
      labels: props.labels,
      datasets: [
        {
          backgroundColor: '#335bc0',
          data: props.data,
          borderWidth: 5,
          borderColor: '#575757',
        },
      ],
    }
  }
  const getXAxis = () => {
    if (props.isHistogram) {
      return [
        {
          display: false,
          barPercentage: 1.3,
          ticks: {
            max: 3,
          },
        },
        {
          display: true,
          gridLines: {
            color: '#575757',
            drawOnChartArea: false,
          },
          ticks: {
            autoSkip: false,
            max: 4,
          },
        },
      ]
    }
    return [
      {
        gridLines: {
          color: '#575757',
          drawOnChartArea: false,
        },
      },
    ]
  }
  return (
    <div>
      <Bar
        data={data}
        options={{
          responsive: true,
          title: {
            display: true,
            text: props.title,
            fontSize: 20,
          },
          layout: {
            padding: {
              left: 20,
              right: 40,
            },
          },
          legend: {
            display: false,
          },
          scales: {
            yAxes: [
              {
                gridLines: {
                  color: '#575757',
                  drawOnChartArea: false,
                },
                scaleLabel: {
                  display: false,
                  labelString: '',
                },
                fontColor: '#191919',
                ticks: {
                  min: 0,
                },
              },
            ],
            xAxes: getXAxis(),
          },
        }}
      />
    </div>
  )
}
export default BarGraph
