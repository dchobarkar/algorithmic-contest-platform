import React from "react";

import { Landing } from "../components/Landing";

export default function Page(): JSX.Element {
  return (
    <main>
      <Landing />
    </main>
  );
}

export const dynamic = "force-dynamic";
