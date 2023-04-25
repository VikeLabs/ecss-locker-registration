import { useState } from "react";
import Button from "../Button";
import TextInput from "../TextInput";
import { useLoaderData } from "react-router-dom";
import { Back } from "../Back";

type Props = {
  locker: string;
};

export function Deregister() {
  const { locker } = useLoaderData() as Props;
  return (
    <div className="w-full max-w-sm flex flex-col items-center gap-4">
      <Back />
      <h1 className="text-2xl font-bold">Deregister locker</h1>
      <p className="text-center">
        This locker will no longer be yours. Please remove any locks and
        belongings from the locker.
      </p>
      <Button onClick={() => null /*submit*/}>Deregister</Button>
    </div>
  );
}
