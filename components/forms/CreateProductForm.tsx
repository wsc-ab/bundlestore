import { useAuthUser } from "@/contexts/AuthUser";
import { firestore, functions } from "@/utils/Firebase";

import { uploadPath } from "@/utils/Storage";
import { collection, doc } from "firebase/firestore";
import { httpsCallable } from "firebase/functions";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Form from "../form/Form";
import FormDetail from "../form/FormDetail";
import FormImages, { Path } from "../form/FormImages";
import FormLink from "../form/FormLink";
import FormPrice from "../form/FormPrice";
import FormSection from "../form/FormSection";
import FormText from "../form/FormText";
import CenterPage from "../pages/CenterPage";

type Input = {
  name: string;
  detail: string;
  images: Path[];
  price: number;
  link?: string;
};

type CreateProductFormProps = {
  onSuccess?: (input: Input & { id: string }) => void | Promise<void>;
  onCancel?: () => void;
  className?: string;
};

export default function CreateProductForm({
  onSuccess,
  onCancel,
  className,
}: CreateProductFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Input>();

  const [submitting, setSubmitting] = useState(false);
  const { authUser } = useAuthUser();
  const { push } = useRouter();

  const storeId = authUser?.stores?.items[0].id;

  const onCreate = async (data: Input) => {
    if (!authUser) {
      alert("Please sign in");
      push("/enter");
      throw new Error("auth user not found");
    }
    const createProduct = httpsCallable(functions, "createProduct");
    const productDoc = doc(collection(firestore, "products"));

    const imagePaths = [];

    for (const image of data.images) {
      // upload image
      const imagePath = await uploadPath(image, {
        user: { id: authUser.id },
        target: { collection: "products", id: productDoc.id },
        type: "images",
      });
      imagePaths.push(imagePath);
    }

    const product = {
      ...data,
      price: data.price * 100,
      link: data.link ? "http://" + data.link : undefined,
      tags: [],
      id: productDoc.id,
      images: imagePaths,
    };

    await createProduct({
      product,
      store: { id: storeId },
    });

    return product;
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      const { id } = await onCreate(data);

      if (onSuccess) {
        onSuccess({ ...data, id });
      }
    } catch (error) {
      alert(error);
    } finally {
      setSubmitting(false);
    }
  });

  if (!storeId) {
    return (
      <CenterPage>
        <p>Need to create a store first</p>
        <p>You need to create a store before creating a product</p>
        <Link href={"/stores/create"}>Create a store</Link>
      </CenterPage>
    );
  }

  return (
    <Form
      onSubmit={onSubmit}
      className={className}
      submitting={submitting}
      onCancel={onCancel}
    >
      <FormSection
        title={"Create product"}
        detail={"Please enter product info."}
      >
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
        <FormLink
          input={{ placeholder: "www.airballoon.app", type: "url" }}
          title="Link"
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
