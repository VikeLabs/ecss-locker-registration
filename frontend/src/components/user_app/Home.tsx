import Table from "../Table";

type Props = {
  lockers: {
    name: string;
    locker: string;
  }[];
};

export function Home({ lockers }: Props) {
  return (
    <div className="w-full flex flex-col items-center gap-2">
      <h1 className="text-2xl font-bold">Registered Lockers</h1>
      <Table rows={lockers} />
    </div>
  );
}
