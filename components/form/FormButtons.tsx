import HeroIcon from "../icons/HeroIcon";

type FormButtonsProps = {
  title: string;
  onSubmit: () => void;
  cancelTitle?: string;
  onCancel?: () => void;
  submitting?: boolean;
};

export default function FormButtons({
  title,
  onSubmit,
  cancelTitle,
  onCancel,
  submitting,
}: FormButtonsProps) {
  return (
    <div>
      <div className="mt-6 flex items-center justify-end gap-x-6">
        {cancelTitle && (
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
            onClick={onCancel}
          >
            {cancelTitle}
          </button>
        )}
        <button
          type="submit"
          className="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={onSubmit}
          disabled={submitting}
        >
          <p className="mr-1">{title}</p>
          {!submitting && (
            <HeroIcon
              className="-mr-0.5 h-5 w-5"
              aria-hidden="true"
              icon={"ArrowRightIcon"}
            />
          )}
          {submitting && (
            <HeroIcon
              className="-mr-0.5 h-5 w-5 animate-spin"
              aria-hidden="true"
              icon={"ArrowPathIcon"}
            />
          )}
        </button>
      </div>
    </div>
  );
}
