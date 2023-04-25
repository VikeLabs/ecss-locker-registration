import { useNavigate } from "react-router-dom";
import chevron from "./chevron_right.svg";

type RowProps = {
  name: string;
  locker: string;
  onClick?: () => void;
};

function Row({ name, locker }: RowProps) {
  let navigate = useNavigate();
  return (
    <tr
      onClick={() => navigate(`/${locker}`)}
      className="text-lg hover:bg-neutral-200 hover:cursor-pointer [&_td]:border-b [&_td]:border-neutral-300 [&_td]:last:border-b-0"
    >
      <td className="p-3 pl-4">{name}</td>
      <td className="p-3">{locker}</td>
      <td className="p-3 pr-4">
        <img className="w-7 h-7 ml-auto mr-0" src={chevron}></img>
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
