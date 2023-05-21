import { useAuthUser } from "@/contexts/AuthUser";
import { Data, GetProduct, Status } from "@/types";
import { functions } from "@/utils/Firebase";
import { uploadPath } from "@/utils/Storage";
import { httpsCallable } from "firebase/functions";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Form from "../form/Form";
import FormDetail from "../form/FormDetail";

import FormImages, { Path } from "../form/FormImages";
import FormLink from "../form/FormLink";
import FormPrice from "../form/FormPrice";
import FormSection from "../form/FormSection";
import FormText from "../form/FormText";
import Loading from "../status/Loading";

type Input = {
  name: string;
  detail: string;
  images: Path[];
  price: number;
  link?: string;
};

type EditProductFormProps = {
  product: { id: string };
  onSuccess?: (product: { id: string }) => void | Promise<void>;
  onCancel?: () => void;
  className?: string;
};

export default function EditProductForm({
  product,
  onSuccess,
  onCancel,
  className,
}: EditProductFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<Input>();

  const [submitting, setSubmitting] = useState(false);
  const { authUser } = useAuthUser();
  const { push } = useRouter();
  const [status, setStatus] = useState<Status>("loading");
  const [data, setData] = useState<Data<"products">>();
  useEffect(() => {
    const load = async () => {
      const getProduct = httpsCallable(functions, "getProduct");
      const {
        data: { product: newProduct },
      } = (await getProduct({ product })) as { data: GetProduct["output"] };
      setData(newProduct);

      reset({
        ...newProduct,
        price: newProduct.price / 100,
        link: newProduct.link.split("://")[1],
        images: newProduct.images.map((elImage) => ({
          url: elImage,
          remote: true,
        })),
      });
      setStatus("loaded");
    };

    if (status === "loading") {
      load();
    }
  }, [product, reset, status]);

  const onEdit = async (data: Input) => {
    if (!authUser) {
      alert("Please sign in");
      push("/enter");
      throw new Error("auth user not found");
    }
    const editProduct = httpsCallable(functions, "editProduct");

    const imagePaths = [];

    for (const image of data.images) {
      // upload image
      const r = await uploadPath(image, {
        user: { id: authUser.id },
        target: { collection: "products", id: product.id },
        type: "images",
      });
      imagePaths.push(r);
    }

    console.log(imagePaths, "imagePaths");

    const newProduct = {
      ...data,
      price: data.price * 100,
      link: data.link ? "http://" + data.link : undefined,
      tags: [],
      id: product.id,
      images: imagePaths,
    };

    await editProduct({
      product: newProduct,
    });

    return product;
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      const product = await onEdit(data);

      if (onSuccess) {
        onSuccess(product);
      }
    } catch (error) {
      alert(error);
    } finally {
      setSubmitting(false);
    }
  });

  if (status === "loading") {
    return <Loading />;
  }

  return (
    <Form
      onSubmit={onSubmit}
      className={className}
      submitting={submitting}
      onCancel={onCancel}
    >
      <FormSection title={"Edit product"} detail={"Please edit product info."}>
        <FormText
          title="Name"
          help="Name of the product."
          input={{ placeholder: "Name", type: "text" }}
          message={errors.name?.message}
          {...register("name", {
            required: "Required",
          })}
        />
        <FormDetail
          title="Detail"
          textArea={{ placeholder: "Detail" }}
          help="Tell us what the product does."
          message={errors.detail?.message}
          {...register("detail", {
            required: "Required",
          })}
        />
        <FormImages
          title="Images"
          help="Show us how the product looks."
          message={errors.images?.message}
          {...register("images", { required: "Required" })}
          onChange={(files) => setValue("images", files)}
          defaultPaths={
            data?.images.map((elImage) => ({ url: elImage, remote: true })) ??
            []
          }
        />
        <FormPrice
          input={{ placeholder: "10.00", type: "text" }}
          title="Price"
          help="The product's full price in before discount."
          message={errors.price?.message}
          {...register("price", {
            required: "Required",
            min: { value: "9.99", message: "Min value is $9.99" },
            max: { value: "99.99", message: "Max value is $99.99" },
          })}
        />
        <FormLink
          input={{ placeholder: "www.airballoon.app", type: "url" }}
          title="Link"
          hint="Optional"
          prefix="http://"
          help="A link to your product page. Should show customers how to use purchase codes."
          message={errors.link?.message}
          {...register("link", {
            required: "Required",
          })}
        />
      </FormSection>
    </Form>
  );
}
