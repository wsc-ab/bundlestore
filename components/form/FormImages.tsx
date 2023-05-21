import { classNames } from "@/utils/Tailwind";
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
import RemoteImage from "../images/RemoteImage";
import { errorClass } from "./FormClassNames";
import FormError from "./FormError";
import FormItem from "./FormItem";
import FormLabel from "./FormLabel";

export type Path =
  | {
      url: string;
      name: string;
      type: File["type"];
      remote: false;
    }
  | {
      url: string;
      remote: true;
    };

type FormImagesProps = {
  title: string;
  message?: string;
  hint?: string;
  help?: string;
  onChange: (input: Path[]) => void;
  defaultPaths?: Path[];
};

function FormImages(
  {
    title,
    message,
    hint,
    help,
    defaultPaths = [],
    onChange,
    ...rest
  }: FormImagesProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  const [path, setPaths] = useState<Path[]>(defaultPaths);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setPaths((pre) => {
      const newFiles = acceptedFiles.filter((elFile) => {
        const objUrl = URL.createObjectURL(elFile);

        return !pre.some(({ url: elUrl }) => elUrl === objUrl);
      });
      const newPaths = newFiles.map((elFile) => ({
        name: elFile.name,
        type: elFile.type,
        url: URL.createObjectURL(elFile),
        remote: false,
      }));
      return [...pre, ...newPaths];
    });
  }, []);

  useEffect(() => {
    onChange(path);
  }, [path, onChange]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".gif", ".jpeg", ".jpg"],
    },
  });

  const onRemove = (url: string) => {
    setPaths((pre) => pre.filter((el) => el.url !== url));
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
          {path.length === 0 && (
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
          {path.length >= 1 && (
            <div className="flex flex-wrap">
              {path.map(({ url }) => (
                <div className="relative m-4" key={url}>
                  <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200 sm:h-40 sm:w-40">
                    <RemoteImage
                      image={url}
                      className="h-full w-full rounded-lg border border-gray-200 object-cover object-center"
                    />
                    <HeroIcon
                      icon="MinusIcon"
                      className="absolute -right-2 -top-2 inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-red-500 text-xs font-bold text-white dark:border-gray-900"
                      onClick={() => onRemove(url)}
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

export default forwardRef<HTMLInputElement, FormImagesProps>(FormImages);
