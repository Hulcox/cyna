import classNames from "classnames"
import { useState } from "react"

const Table = (props) => {
  const { columns, data } = props

  const [rows, setRows] = useState(data)
  const [sort, setSort] = useState({ CVEs: true })

  const color = {
    Critical: "bg-red-600",
    High: "bg-amber-600",
    Medium: "bg-yellow-400",
    Info: "bg-blue-500"
  }

  const handleSort = (column) => {
    return () => {
      const sorted = rows.sort(
        (a, b) => {
          if (sort[column]) {
            return a[column] > b[column] ? 1 : -1
          } else {
            return a[column] < b[column] ? 1 : -1
          }
        })
      setRows(sorted)
      setSort({ [column]: !sort[column] })
    }
  }

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
        <tr>
          <th></th>
          {columns.map((column, key) => (
            <th key={key} onClick={handleSort(column)}>{column}</th>
          ))}
        </tr>
        </thead>
        <tbody>
        {data.map((row, key) => (
          <tr key={key}>
            <td className="font-bold">{key + 1}</td>
            {columns.map((column, i) => (
              <td key={i}>
                  <span
                    className={classNames(column === "Severity" && [color[row[column]], "px-3 py-2 rounded-lg"])}
                  >
                    {row[column] || "-"}
                  </span>
              </td>
            ))}
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table
