import { classNames } from "@/utils/Tailwind";
import Image from "next/image";
import input from "postcss/lib/input";
import {
  ForwardedRef,
  forwardRef,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useDropzone } from "react-dropzone";
import HeroIcon from "../icons/HeroIcon";
import { errorClass } from "./FormClassNames";
import FormError from "./FormError";
import FormItem from "./FormItem";
import FormLabel from "./FormLabel";

type FormFilesProps = {
  title: string;
  message?: string;
  hint?: string;
  help?: string;
  onChange: (input: File[]) => void;
};

function FormFiles(
  { title, message, hint, help, onChange, ...rest }: FormFilesProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  const [files, setFiles] = useState<File[]>([]);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((pre) => {
      const newFiles = acceptedFiles.filter(
        (elFile) => !pre.some(({ name: elName }) => elName === elFile.name)
      );
      return [...pre, ...newFiles];
    });
  }, []);

  useEffect(() => {
    onChange(files);
  }, [files, onChange]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".gif", ".jpeg", ".jpg"],
    },
  });

  const onRemove = (file: File) => {
    setFiles((pre) => pre.filter((el) => el.name !== file.name));
  };

  return (
    <FormItem>
      <FormLabel
        className="flex justify-between"
        title={title}
        hint={hint}
        htmlFor={input.name}
      />
      <div className="mt-2">
        <div
          {...getRootProps()}
          className={classNames(
            errorClass(message),
            "flex justify-center rounded-lg border-0 px-6 py-10 ring-1 ring-inset focus:ring-2 focus:ring-inset"
          )}
        >
          {files.length === 0 && (
            <div className="text-center">
              <HeroIcon
                icon="PhotoIcon"
                className="mx-auto h-12 w-12 text-gray-300"
                aria-hidden="true"
              />
              <div className="mt-4 flex text-sm leading-6 text-gray-600">
                <label
                  htmlFor="file-upload"
                  className={
                    "relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                  }
                >
                  <span>Upload a file</span>
                  <input
                    ref={ref}
                    {...getInputProps()}
                    {...input}
                    {...rest}
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs leading-5 text-gray-600">
                PNG, JPG, GIF, JPEG up to 10MB
              </p>
            </div>
          )}
          {files.length >= 1 && (
            <div className="flex flex-wrap">
              {files.map((file) => (
                <div className="relative m-4" key={file.name}>
                  <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200 sm:h-40 sm:w-40">
                    <Image
                      src={URL.createObjectURL(file)}
                      alt="product"
                      className="h-full w-full object-cover object-center "
                      width={100}
                      height={100}
                    />
                    <HeroIcon
                      icon="MinusIcon"
                      className="absolute -right-2 -top-2 inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-red-500 text-xs font-bold text-white dark:border-gray-900"
                      onClick={() => onRemove(file)}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {help && <p className="mt-2 text-sm text-gray-500">{help}</p>}
      <FormError title={message} className="mt-2" />
    </FormItem>
  );
}

export default forwardRef<HTMLInputElement, FormFilesProps>(FormFiles);
