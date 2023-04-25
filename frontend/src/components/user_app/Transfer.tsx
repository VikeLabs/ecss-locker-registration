import { useState } from "react";
import Button from "../Button";
import TextInput from "../TextInput";
import { Back } from "../Back";

export function Transfer() {
  const [email, setEmail] = useState("");

  return (
    <div className="w-full max-w-sm flex flex-col items-center gap-4">
      <Back />
      <h1 className="text-2xl font-bold">Transfer locker</h1>
      <p className="text-center">
        An email will be sent confirming the transfer. After one day the email
        will expire and it will have to be resent.
      </p>
      <TextInput
        label="Email"
        id="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button onClick={() => null /*submit*/}>Transfer</Button>
    </div>
  );
}
