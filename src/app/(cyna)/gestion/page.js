"use client"

import classNames from "classnames"
import Image from "next/image"
import { useEffect, useState } from "react"

const dataInit = [
  {
    ip: "172.16.206.24",
    cve: "CVE-1999-0524",
    cvss: 2.5,
    severity: "high",
    cyberscore: null
  },
  {
    ip: "172.16.206.24",
    cve: "CVE-1999-0525",
    cvss: 2.5,
    severity: "high",
    cyberscore: null
  },
  {
    ip: "172.16.206.24",
    cve: "CVE-1999-0526",
    cvss: 2.5,
    severity: "high",
    cyberscore: null
  },
  {
    ip: "172.16.206.28",
    cve: "CVE-1999-0524",
    cvss: 5,
    severity: "general",
    cyberscore: null
  },
  {
    ip: "172.16.206.28",
    cve: "CVE-1999-0525",
    cvss: 5,
    severity: "general",
    cyberscore: null
  },
]

const PageSchema = () => {
  const [data, setData] = useState(dataInit)
  const [ipSelected, setIpSelected] = useState(null)
  const [tabSelect, setTabSelect] = useState("general")
  const [dataTable, setDataTable] = useState(data)

  const columns = [
    "IP",
    "CVEs",
    "CVSS",
    "Severity",
    "Cyberscore",
    "Action"
  ]

  const color = {
    high: "bg-red-900",
    general: "bg-orange-700",
    low: "bg-green-700"
  }

  useEffect(() => {
    if (ipSelected) {
      const object = data.filter((elm) => elm.ip === ipSelected)

      let severity = findMostFrequentSeverity(object)

      setDataTable(object)
      setTabSelect(severity)
    } else {
      setDataTable(data)
      setTabSelect("general")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ipSelected])

  const findMostFrequentSeverity = (objects) => {
    // Compter le nombre d'occurrences de chaque severity
    const severityCount = {}
    let maxSeverity = null
    let maxCount = 0

    objects.forEach((element) => {
      const severity = element.severity
      severityCount[severity] = (severityCount[severity] || 0) + 1

      if (severityCount[severity] > maxCount) {
        maxCount = severityCount[severity]
        maxSeverity = severity
      }
    })

    return maxSeverity
  }

  const handleTabSelect = (value) => {
    setTabSelect(value)
  }

  const handleIpSelect = (value) => {
    if (value == ipSelected) {
      setIpSelected(null)
    } else {
      setIpSelected(value)
    }
  }

  const handleInputIp = (event) => {
    if (event.target.value.length == 0) {
      setIpSelected(null)
    } else {
      setIpSelected(event.target.value)
    }
  }

  const handleSeverity = (value, cve, ip) => {
    const object = data.map((elm) => {
      if (cve == elm.cve && ip == elm.ip) {
        return { ...elm, severity: value }
      } else {
        return elm
      }
    })
    setData(object)
    setDataTable(object)
    console.log(object)
  }

  return (
    <div className="p-10 flex flex-col items-center gap-10">
      <div className="flex gap-5 items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div
            className="w-20 h-20 bg-red-900 rounded-md cursor-pointer hover:w-[5.5rem] hover:h-[5.5rem]"
            onClick={() => {
              handleIpSelect("172.16.206.24")
            }}
          ></div>
          <h2
            className={`text-lg font-bold ${
              ipSelected == "172.16.206.24" && "text-red-800"
            }`}
          >
            172.16.206.24
          </h2>
        </div>
        <div className="h-1 w-20 bg-slate-500 rounded-lg mb-8"></div>
        <div className="flex flex-col items-center gap-4">
          <div
            className="w-20 h-20  bg-green-700 rounded-md cursor-pointer hover:w-[5.5rem] hover:h-[5.5rem]"
            onClick={() => {
              handleIpSelect("172.16.206.25")
            }}
          >
            <Image
              src="/images/raspberry.png"
              alt="raspberry"
              width={110}
              height={110}
            />
          </div>
          <h2
            className={`text-lg font-bold ${
              ipSelected == "172.16.206.25" && "text-red-800"
            }`}
          >
            172.16.206.25
          </h2>
        </div>
        <div className="h-1 w-20 bg-slate-500 rounded-lg mb-8"></div>
        <div className="flex flex-col items-center gap-4">
          <div
            className="w-20 h-20 bg-orange-700 rounded-md cursor-pointer hover:w-[5.5rem] hover:h-[5.5rem]"
            onClick={() => {
              handleIpSelect("172.16.206.28")
            }}
          ></div>
          <h2
            className={`text-lg font-bold ${
              ipSelected == "172.16.206.28" && "text-red-800"
            }`}
          >
            172.16.206.28
          </h2>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <input
          type="text"
          placeholder="Addresse Ip"
          className="input border-orange-400 w-full max-w-xs my-5"
          value={ipSelected}
          onChange={handleInputIp}
        />
        <div className="tabs">
          <a
            className={`tab tab-bordered text-xl ${
              tabSelect == "general" && "tab-active"
            }`}
            onClick={() => {
              handleTabSelect("general")
            }}
          >
            General
          </a>
          <a
            className={`tab tab-bordered text-xl ${
              tabSelect == "low" && "tab-active"
            }`}
            onClick={() => {
              handleTabSelect("low")
            }}
          >
            Low
          </a>
          <a
            className={`tab tab-bordered text-xl ${
              tabSelect == "high" && "tab-active"
            }`}
            onClick={() => {
              handleTabSelect("high")
            }}
          >
            High
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
            <tr>
              <th></th>
              {columns.map((column, key) => (
                <th key={key}>{column}</th>
              ))}
            </tr>
            </thead>
            <tbody>
            {dataTable
              ?.filter((elm) => elm.severity == tabSelect)
              .map(({ ip, host, cve, cvss, severity, cyberscore }, key) => (
                <tr key={key}>
                  <td>{key++}</td>
                  <td>{ip}</td>
                  <td>{cve}</td>
                  <td>{cvss}</td>
                  <td>
                    <div
                      className={classNames([
                        color[severity],
                        "badge text-white"
                      ])}
                    >
                      {severity}
                    </div>
                  </td>
                  <td>{cyberscore}</td>
                  <td>
                    <div className="flex gap-5">
                      <button
                        className="btn btn-sm"
                        onClick={() => {
                          handleSeverity(
                            severity == "general" ? "low" : "general",
                            cve,
                            ip
                          )
                        }}
                      >
                        {severity == "general" ? "Low" : "general"}
                      </button>
                      <button
                        className="btn btn-sm"
                        onClick={() => {
                          handleSeverity(
                            severity == "high" ? "low" : "high",
                            cve,
                            ip
                          )
                        }}
                      >
                        {severity == "high" ? "low" : "high"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default PageSchema
