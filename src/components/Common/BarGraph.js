import React from 'react'
import { Bar, HorizontalBar } from 'react-chartjs-2'
const BarGraph = props => {
  let data
  if (props.showMultiple) {
    data = {
      labels: props.data.train.labels,
      datasets: [
        {
          label: 'train',
          backgroundColor: '#335bc0',
          borderColor: '#335bc0',
          data: props.data.train.values,
          borderWidth: 5,
        },
        {
          label: 'validation',
          backgroundColor: '#c4c4c4',
          borderColor: '#c4c4c4',
          data: props.data.valid.values,
          borderWidth: 5,
        },
      ],
    }
  } else {
    data = {
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
  }
  if (props.isHistogram) {
    data = {
      labels: props.labels,
      datasets: [
        {
          backgroundColor: '#335bc0',
          data: props.data,
          borderWidth: 1,
          borderColor: '#c4c4c4',
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
            max: Math.max(...props.labels) - 1,
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
            max: Math.max(...props.labels),
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
  const getOptions = () => {
    const options = {
      responsive: true ,
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
    }
    if (props.showMultiple) {
      options.legend = {
        display: true,
      }
      const temp = options.scales.yAxes
      options.scales.yAxes = options.scales.xAxes
      options.scales.xAxes = temp
    }
    return options
  }
  if (props.showMultiple) {
    return (
      <div>
        <HorizontalBar data={data} options={getOptions()} width={300} height={550}/>
      </div>
    )
  }
  return (
    <div>
      <Bar data={data} options={getOptions()} />
    </div>
  )
}
export default BarGraph
