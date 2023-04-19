import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Home } from "./user_app/Home";
import Table from "./Table";

export default function UserApp() {
  return (
    <React.StrictMode>
      <HashRouter>
        <Routes>
          <Route
            index
            element={
              <Home
                lockers={[
                  { name: "Malcolm Seyd", locker: "120" },
                  { name: "VikeSec", locker: "144" },
                ]}
              />
            }
          />
          {/* <Route path="/:id" element={<MockLocker />} /> */}
        </Routes>
      </HashRouter>
    </React.StrictMode>
  );
}

// function MockLocker() {
//   return (
//   );
// }
