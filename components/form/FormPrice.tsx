import { ForwardedRef, forwardRef } from "react";
import FormItem from "./FormItem";
import FormError from "./FormError";
import FormLabel from "./FormLabel";
import { errorClass } from "./FormClassNames";
import { classNames } from "@/utils/Tailwind";

type FormPriceProps = {
  title: string;
  message?: string;
  hint?: string;
  help?: string;
  input: JSX.IntrinsicElements["input"];
};

function FormPrice(
  { title, input, message, hint, help, ...rest }: FormPriceProps,
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
      <div className="relative mt-2 rounded-md shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <span className="text-gray-500 sm:text-sm">$</span>
        </div>
        <input
          ref={ref}
          {...input}
          {...rest}
          aria-describedby="price-currency"
          className={classNames(
            errorClass(message),
            "block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          )}
        />
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <span className="text-gray-500 sm:text-sm" id="price-currency">
            USD
          </span>
        </div>
      </div>
      {help && <p className="mt-2 text-sm text-gray-500">{help}</p>}
      <FormError title={message} className="mt-2" />
    </FormItem>
  );
}

export default forwardRef<HTMLInputElement, FormPriceProps>(FormPrice);
