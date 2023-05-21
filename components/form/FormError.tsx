import React from "react";

type FormErrorProps = {
  title?: string;
  className?: string;
};

export default function FormError({ title, className }: FormErrorProps) {
  return (
    <div className={className}>
      <p className="text-sm text-red-600">{title}</p>
    </div>
  );
}
