import classNames from "classnames"

const Table = (props) => {
  const { columns, data } = props

  const color = {
    Critical: "bg-red-600",
    High: "bg-amber-600",
    Medium: "bg-yellow-400",
    Info: "bg-blue-500"
  }

  // todo: order by column in the table

  return (
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
