import { classNames } from "@/utils/Tailwind";
import { ForwardedRef, forwardRef } from "react";
import { errorClass } from "./FormClassNames";
import FormError from "./FormError";
import FormItem from "./FormItem";
import FormLabel from "./FormLabel";

type FormTextProps = {
  title: string;
  prefix?: string;
  message?: string;
  hint?: string;
  help?: string;
  input: JSX.IntrinsicElements["input"];
};

function FormText(
  { title, prefix, input, message, hint, help, ...rest }: FormTextProps,
  ref: ForwardedRef<HTMLInputElement>
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
        <input
          ref={ref}
          {...input}
          {...rest}
          className={classNames(
            errorClass(message),
            "block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
          )}
        />
      </div>
      {help && <p className="mt-2 text-sm text-gray-500">{help}</p>}
      <FormError title={message} className="mt-2" />
    </FormItem>
  );
}

export default forwardRef<HTMLInputElement, FormTextProps>(FormText);
