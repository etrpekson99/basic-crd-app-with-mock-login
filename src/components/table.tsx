interface TableProps {
  headers: JSX.Element;
  rows: JSX.Element[];
}

const Table = (props: TableProps) => {
  const { headers, rows } = props;

  return (
    <div className="table table-auto w-full">
      <div className=" flex items-center bg-white border-b border-black-5 py-3 px-4  border-b-black-5 h-14">
        {headers}
      </div>

      {rows.map((row) => (
        <div
          key={row.key}
          className="bg-white flex items-center  border-b border-black-5 py-3 px-4 border-b-black-5 last:border-none last:rounded-br-lg last:rounded-bl-lg h-14"
          data-testid="table-rows"
        >
          {row}
        </div>
      ))}
    </div>
  );
}

export default Table;
