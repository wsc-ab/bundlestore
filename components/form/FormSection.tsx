import { PropsWithChildren } from "react";

type FormSectionProps = PropsWithChildren & {
  title: string;
  detail: string;
  className?: string;
};

export default function FormSection({
  title,
  detail,
  className,
  children,
}: FormSectionProps) {
  return (
    <div className={className}>
      <div className="mx-auto max-w-2xl sm:grid sm:items-start sm:gap-4 sm:py-6">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          {title}
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">{detail}</p>
        <div className="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
          {children}
        </div>
      </div>
    </div>
  );
}
