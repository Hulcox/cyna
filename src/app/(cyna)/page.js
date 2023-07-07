"use client"
import React, { useEffect, useState } from "react"
import BarChart from "@/components/barChart"
import NoData from "@/components/noData"
import CyberScore from "@/components/cyberScore"

export default function Home() {
  const [cyberScore, setCyberScore] = useState("E")
  const [data, setData] = useState([])

  const files = [
    "ip_par_severity_data"
  ]

  useEffect(() => {
    files.map((file) => {
      fetch(`/stats/${file}.json`)
        .then((response) => response.json())
        .then((info) => {
          const name = file.split("_").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
          const unit = { name, ...info }
          setData((prev) => [...prev, unit])
        })
        .catch((error) => {
          console.log(`Une erreur s'est produite lors du chargement du fichier JSON : ${error.message}`)
        })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const file = "openvas"
    fetch(`/docs/${file}.json`)
      .then((response) => response.json())
      .then((data) => {
        const cvssValues = data.map((entry) => entry.CVSS)

        let score = 0
        let w = 0
        for (const cvss of cvssValues) {
          score += cvss * (Math.floor(cvss) ** 2)
          w += Math.floor(cvss) ** 2
        }

        let cyberScore = score / w
        cyberScore = cyberScore / 2

        const tmp = ["A", "B", "C", "D", "E"]
        const result = tmp[Math.floor(cyberScore)]
        setCyberScore(result)
      })
      .catch((error) => {
        console.log(`Une erreur s'est produite lors du chargement du fichier JSON : ${error.message}`)
      })
  }, [])


  return (
    <div className="p-10 w-3/4">
      {data && data.map((info, index) => (
        <div className="flex flex-col gap-10" key={index}>
          <div className="flex flex-col gap-5">
            <h1 className="font-bold uppercase text-xl">
              Nos données actuelles
            </h1>
            <CyberScore cyberScore={cyberScore}/>
          </div>
          <BarChart info={info}/>
        </div>
      ))}
      {data.length === 0 && <NoData/>}
    </div>
  )
}
