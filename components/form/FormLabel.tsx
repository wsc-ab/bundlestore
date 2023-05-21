import React from "react";

type FormLabelProps = {
  title: string;
  htmlFor?: string;
  hint?: string;
  className?: string;
};

export default function FormLabel({
  title,
  htmlFor,
  hint,
  className,
}: FormLabelProps) {
  return (
    <div className={`flex justify-between ${className}`}>
      <label
        htmlFor={htmlFor}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {title}
      </label>
      {hint && (
        <span className="text-sm leading-6 text-gray-500" id="email-optional">
          {hint}
        </span>
      )}
    </div>
  );
}
