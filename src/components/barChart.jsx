"use client"
import React from "react"
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  Title,
  Tooltip
} from "chart.js"
import { Bar } from "react-chartjs-2"

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const BarChart = (props) => {
  const { info } = props

  const data = {
    labels: info.labels,
    datasets: [
      {
        label: info.datasets[0].label,
        backgroundColor: info.datasets[0].backgroundColor,
        borderColor: info.datasets[0].borderColor,
        data: info.datasets[0].data.map((array) => array.length)
      }
    ]
  }

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "top"
      },
      title: {
        display: true,
        text: info.name
      }
    }
  }

  return (
    <div>
      <Bar data={data} options={options}/>
    </div>
  )
}

export default BarChart