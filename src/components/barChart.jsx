"use client"
import React, { useState } from "react"
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
import classNames from "classnames"

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

  const [clickedSeverity, setClickedSeverity] = useState("")
  const [clickedIPs, setClickedIPs] = useState([])

  const color = {
    Critical: "bg-red-600",
    High: "bg-amber-600",
    Medium: "bg-yellow-400",
    Info: "bg-blue-500"
  }

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
        display: false,
      },
      title: {
        display: true,
        text: info.name
      }
    },
    onClick: (event, elements) => {
      if (elements.length > 0) {
        const clickedIndex = elements[0].index
        const clickedIPs = info.datasets[0].data[clickedIndex]

        setClickedSeverity(info.labels[clickedIndex])
        setClickedIPs(clickedIPs)
      }
    }
  }

  return (
    <div>
      <Bar data={data} options={options}/>
      {clickedIPs.length > 0 && (
        <div className="m-8 px-4 py-2">
          <div className="flex gap-5 items-center">
            <h4 className="font-bold">IPs concernées :</h4>
            <div className={classNames(color[clickedSeverity], "p-2 rounded-lg")}>{clickedSeverity}</div>
          </div>
          <ul className="mx-5 my-2">
            {clickedIPs.map((ip, index) => (
              <li key={index}>{ip}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default BarChart
