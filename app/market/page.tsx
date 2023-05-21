"use client";

import { UserButton } from "@clerk/nextjs";

export default function Market() {
  const onClick = async () => {
    const res = await fetch("api/orders", { method: "POST" });
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>Marke asdf asdfa sdf t</p>
      <button onClick={onClick}>Test</button>
      <UserButton afterSignOutUrl="/" />
    </main>
  );
}
