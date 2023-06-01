"use client";

import { Product } from "@prisma/client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Form from "../form/Form";
import FormDetail from "../form/FormDetail";
import FormImages from "../form/FormImages";
import FormLink from "../form/FormLink";
import FormPrice from "../form/FormPrice";
import FormSection from "../form/FormSection";
import FormText from "../form/FormText";

type Path =
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

type Input = Omit<Product, "id" | "createdAt" | "images"> & { images: Path[] };

type ProductFormProps = {
  onSuccess?: (input: Product) => void | Promise<void>;
  onCancel?: () => void;
  className?: string;
};

export default function AddProductForm({
  onSuccess,
  onCancel,
  className,
}: ProductFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Input>();

  const [submitting, setSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);

      // get signed url
      const res = await fetch("/api/r2/put");
      const { signedUrl } = await res.json();

      // upload images
      const response0 = await fetch(signedUrl, {
        method: "PUT",
        headers: { "Content-Type": data.images[0].file.type },
        body: data.images[0].file,
      });

      console.log(response0, "response0");

      // const response = await fetch("/api/products", {
      //   method: "POST",
      //   body: { ...data, images: [response0.url] },
      // });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      if (onSuccess) {
        const product = (await response.json()) as Product;
        onSuccess(product);
      }
    } catch (error) {
      alert(`Please retry: ${error}`);
    } finally {
      setSubmitting(false);
    }
  });

  return (
    <Form
      onSubmit={onSubmit}
      className={className}
      submitting={submitting}
      onCancel={onCancel}
    >
      <FormSection title={"Add product"} detail={"Add product info."}>
        <FormText
          title="Name"
          help="What's the name of the product?"
          input={{ placeholder: "BundleStore", type: "text" }}
          message={errors.name?.message}
          {...register("name", {
            required: "Required",
          })}
        />
        <FormDetail
          textArea={{
            placeholder:
              "BundleStore increases product sales through bundling.",
          }}
          title="Detail"
          help="What does your product do?"
          message={errors.detail?.message}
          {...register("detail", {
            required: "Required",
          })}
        />
        <FormLink
          input={{ placeholder: "www.airballoon.app", type: "url" }}
          title="Link"
          prefix="http://"
          help="A link to your product."
          message={errors.link?.message}
          {...register("link", {
            required: "Required",
          })}
        />
        <FormImages
          title="Images"
          help="Show us how the product looks."
          message={errors.images?.message}
          {...register("images", { required: "Required", minLength: 2 })}
          onChange={(files) => setValue("images", files)}
        />
        <FormPrice
          input={{ placeholder: "10.00", type: "text" }}
          title="Price"
          help="The product's full price before discount."
          message={errors.price?.message}
          {...register("price", {
            required: "Required",
            min: { value: "9.99", message: "Min value is $9.99" },
            max: { value: "99.99", message: "Max value is $99.99" },
          })}
        />
      </FormSection>
    </Form>
  );
}
