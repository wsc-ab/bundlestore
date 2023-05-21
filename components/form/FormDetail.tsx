import input from "postcss/lib/input";
import { ForwardedRef, forwardRef } from "react";
import FormItem from "./FormItem";
import FormError from "./FormError";
import FormLabel from "./FormLabel";
import { classNames } from "@/utils/Tailwind";
import { errorClass } from "./FormClassNames";

type FormDetailProps = {
  title: string;
  message?: string;
  hint?: string;
  help?: string;
  textArea: JSX.IntrinsicElements["textarea"];
};

function FormDetail(
  { title, textArea, message, hint, help, ...rest }: FormDetailProps,
  ref: ForwardedRef<HTMLTextAreaElement>
) {
  return (
    <FormItem>
      <FormLabel
        className="flex justify-between"
        title={title}
        hint={hint}
        htmlFor={input.name}
      />
      <div className="mt-2">
        <textarea
          ref={ref}
          {...textArea}
          {...rest}
          className={classNames(
            errorClass(message),
            "block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
          )}
        />
      </div>
      {help && <p className="mt-2 text-sm text-gray-500">{help}</p>}
      <FormError title={message} className="mt-2" />
    </FormItem>
  );
}

export default forwardRef<HTMLTextAreaElement, FormDetailProps>(FormDetail);
