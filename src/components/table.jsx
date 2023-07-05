const Table = (props) => {
  const { columns, data } = props;

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
                <td key={i}>{row[column]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
