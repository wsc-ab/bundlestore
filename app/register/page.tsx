"use client";

import FormContent from "@/components/forms/FormContent";
import OkContent from "@/components/forms/OkContent";
import RegisterForm from "@/components/forms/RegisterForm";
// import { useRouter } from "next/router";

import { useState } from "react";

export default function Register() {
  const [type, setType] = useState<"form" | "ok">("form");
  //   const { push } = useRouter();

  return (
    <main>
      {type === "form" && (
        <div>
          <FormContent />
          <RegisterForm
            onSuccess={() => setType("ok")}
            // onCancel={() => push("/")}
            className="px-6 pb-32"
          />
        </div>
      )}
      {type === "ok" && <OkContent />}
    </main>
  );
}
