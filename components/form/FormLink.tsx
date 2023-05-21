import { ForwardedRef, forwardRef } from "react";
import FormError from "./FormError";
import FormItem from "./FormItem";
import FormLabel from "./FormLabel";
import { errorClass } from "./FormClassNames";
import { classNames } from "@/utils/Tailwind";

type FormLinkProps = {
  title: string;
  prefix?: string;
  message?: string;
  hint?: string;
  help?: string;
  input: JSX.IntrinsicElements["input"];
};

function FormLink(
  { title, prefix, input, message, hint, help, ...rest }: FormLinkProps,
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
        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
          {prefix && (
            <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
              {prefix}
            </span>
          )}
          <input
            ref={ref}
            {...input}
            {...rest}
            className={classNames(
              errorClass(message),
              "block flex-1 border-0 bg-black bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
            )}
          />
        </div>
      </div>
      {help && <p className="mt-2 text-sm text-gray-500">{help}</p>}
      <FormError title={message} className="mt-2" />
    </FormItem>
  );
}

export default forwardRef<HTMLInputElement, FormLinkProps>(FormLink);
