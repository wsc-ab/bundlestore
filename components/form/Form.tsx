import { PropsWithChildren } from "react";
import FormButtons from "./FormButtons";

type FormProps = PropsWithChildren & {
  submitting: boolean;
  submitTitle?: string;
  cancelTitle?: string;
  onSubmit: () => void;
  onCancel?: () => void;
  className?: string;
};

export default function Form({
  children,
  submitting,
  submitTitle = "Enter",
  cancelTitle = "Cancel",
  onCancel,
  onSubmit,
  className,
}: FormProps) {
  return (
    <form onSubmit={onSubmit} className={className}>
      {children}
      <FormButtons
        submitting={submitting}
        title={submitTitle}
        cancelTitle={cancelTitle}
        onSubmit={onSubmit}
        onCancel={onCancel}
      />
    </form>
  );
}
