import React from "react";
import { RouterProvider, createHashRouter } from "react-router-dom";
import { Home } from "./user_app/Home";
import { Locker } from "./user_app/Locker";
import type { LockerStatus } from "../types";
import { Transfer } from "./user_app/Transfer";
import { Deregister } from "./user_app/Deregister";

const mockData: {
  [key: string]: {
    name: string;
    status: LockerStatus;
  };
} = {
  "120": {
    name: "Malcolm Seyd",
    status: "expired",
  },
  "144": {
    name: "VikeSec",
    status: "claimed",
  },
};

const router = createHashRouter([
  {
    path: "/",
    element: <Home />,
    loader: () => {
      return {
        lockers: Object.entries(mockData).map(([id, obj]) => ({
          locker: id,
          ...obj,
        })),
      };
    },
  },
  {
    path: ":id",
    element: <Locker />,
    loader: ({ params }) => {
      if (params.id === undefined) {
        throw Error("no such locker");
      }
      return { ...mockData[params.id as any], locker: params.id };
    },
  },
  {
    path: ":id/transfer",
    element: <Transfer />,
    loader: ({ params }) => {
      if (params.id === undefined) {
        throw Error("no such locker");
      }
      return { locker: params.id };
    },
  },
  {
    path: ":id/deregister",
    element: <Deregister />,
    loader: ({ params }) => {
      if (params.id === undefined) {
        throw Error("no such locker");
      }
      return { locker: params.id };
    },
  },
]);

export default function UserApp() {
  return (
    <React.StrictMode>
      <RouterProvider router={router}></RouterProvider>
    </React.StrictMode>
  );
}
