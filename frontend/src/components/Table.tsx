import chevron from "./chevron_right.svg";

type RowProps = {
  name: string;
  locker: string;
  onClick?: () => void;
};

function Row({ name, locker }: RowProps) {
  return (
    <tr className="text-lg font-medium hover:bg-neutral-100 [&_td]:border-b [&_td]:border-neutral-300 [&_td]:last:border-b-0 ">
      <td className="p-1 pl-2 m0">{name}</td>
      <td>{locker}</td>
      <td>
        <img className="w-7 h-7" src={chevron}></img>
      </td>
    </tr>
  );
}

type TableProps = {
  rows: RowProps[];
};

export default function Table({ rows }: TableProps) {
  return (
    <div className="w-full max-w-sm overflow-hidden box-border rounded-lg bg-neutral-50 border border-neutral-300">
      <table className="w-full border-combined">
        <tbody>{rows.map(Row)}</tbody>
      </table>
    </div>
  );
}
