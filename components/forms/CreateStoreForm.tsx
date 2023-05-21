import { useAuthUser } from "@/contexts/AuthUser";
import { firestore, functions } from "@/utils/Firebase";
import { uploadPath } from "@/utils/Storage";
import { collection, doc } from "firebase/firestore";
import { httpsCallable } from "firebase/functions";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Form from "../form/Form";
import FormDetail from "../form/FormDetail";

import FormImages, { Path } from "../form/FormImages";
import FormLink from "../form/FormLink";
import FormSection from "../form/FormSection";
import FormText from "../form/FormText";

type Input = {
  name: string;
  detail: string;
  images: Path[];
  price: number;
  link?: string;
};

type CreateStoreFormProps = {
  onSuccess?: (input: Input & { id: string }) => void | Promise<void>;
  onCancel?: () => void;
  className?: string;
};

export default function CreateStoreForm({
  onSuccess,
  onCancel,
  className,
}: CreateStoreFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Input>();

  const [submitting, setSubmitting] = useState(false);
  const { authUser } = useAuthUser();
  const { push } = useRouter();

  const onCreate = async (data: Input) => {
    if (!authUser) {
      alert("Please sign in");
      push("/enter");
      throw new Error("auth user not found");
    }
    const createstore = httpsCallable(functions, "createStore");
    const storeDoc = doc(collection(firestore, "stores"));

    const imagePaths = [];

    for (const image of data.images) {
      // upload image
      const r = await uploadPath(image, {
        user: { id: authUser.id },
        target: { collection: "stores", id: storeDoc.id },
        type: "images",
      });
      imagePaths.push(r);
    }

    const store = {
      ...data,
      link: data.link ? "http://" + data.link : undefined,
      tags: [],
      id: storeDoc.id,
      images: imagePaths,
    };

    await createstore({
      store,
    });

    return store;
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

  return (
    <Form
      onSubmit={onSubmit}
      className={className}
      submitting={submitting}
      onCancel={onCancel}
    >
      <FormSection title={"Create store"} detail={"Please enter store info."}>
        <FormText
          title="Name"
          help="Name of the store."
          input={{ placeholder: "Name", type: "text" }}
          message={errors.name?.message}
          {...register("name", {
            required: "Required",
          })}
        />
        <FormDetail
          title="Detail"
          textArea={{ placeholder: "Detail" }}
          help="Tell us what the store does."
          message={errors.detail?.message}
          {...register("detail", {
            required: "Required",
          })}
        />
        <FormImages
          title="Images"
          help="Show us how the store looks."
          message={errors.images?.message}
          {...register("images", { required: "Required" })}
          onChange={(files) => setValue("images", files)}
        />
        <FormLink
          input={{ placeholder: "www.airballoon.app", type: "url" }}
          title="Link"
          hint="Optional"
          prefix="http://"
          help="A link to your store page."
          message={errors.link?.message}
          {...register("link")}
        />
      </FormSection>
    </Form>
  );
}
