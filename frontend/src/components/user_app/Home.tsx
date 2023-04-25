import { useLoaderData } from "react-router-dom";
import Table from "../Table";

type Props = {
  lockers: {
    name: string;
    locker: string;
  }[];
};

export function Home() {
  const { lockers } = useLoaderData() as Props;
  return (
    <div className="w-full max-w-sm flex flex-col items-center gap-2">
      <h1 className="text-2xl font-bold">Registered Lockers</h1>
      <Table rows={lockers} />
    </div>
  );
}
