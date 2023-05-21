import React from "react";

type FormHelpProps = {
  title: string;
  className?: string;
};

export default function FormHelp({ title, className }: FormHelpProps) {
  return (
    <div className={className}>
      <p className="text-sm text-gray-500">{title}</p>
    </div>
  );
}
