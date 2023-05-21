import React, { PropsWithChildren } from "react";

type FormItemProps = PropsWithChildren;

export default function FormItem({ children }: FormItemProps) {
  return (
    <div className="max-w-2xl mx-auto sm:grid sm:items-start sm:gap-4 sm:py-6">
      {children}
    </div>
  );
}
