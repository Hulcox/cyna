"use client"
import React, { useEffect, useState } from "react"
import BarChart from "@/components/barChart"
import NoData from "@/components/noData"
import CyberScore from "@/components/cyberScore"

export default function Home() {
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

  return (
    <div className="p-10 w-3/4">
      {data && data.map((info, index) => (
        <div className="flex flex-col gap-10" key={index} >
          <div className="flex flex-col gap-5">
            <h1 className="font-bold uppercase text-xl">
              Nos données actuelles
            </h1>
            <CyberScore cyberScore={"D"} />
          </div>
          <BarChart info={info}/>
        </div>
      ))}
      {data.length === 0 && <NoData/>}
    </div>
  )
}
