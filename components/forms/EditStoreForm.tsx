import { useAuthUser } from "@/contexts/AuthUser";
import { Data, GetStore, Status } from "@/types";
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

type EditStoreFormProps = {
  store: { id: string };
  onSuccess?: (store: { id: string }) => void | Promise<void>;
  onCancel?: () => void;
  className?: string;
};

export default function EditStoreForm({
  store,
  onSuccess,
  onCancel,
  className,
}: EditStoreFormProps) {
  const [submitting, setSubmitting] = useState(false);
  const { authUser } = useAuthUser();
  const { push } = useRouter();
  const [status, setStatus] = useState<Status>("loading");
  const [data, setData] = useState<Data<"stores">>();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<Input>();

  useEffect(() => {
    const load = async () => {
      const getStore = httpsCallable(functions, "getStore");
      const {
        data: { store: newStore },
      } = (await getStore({ store })) as { data: GetStore["output"] };
      setData(newStore);
      reset({
        ...newStore,
        link: newStore.link ? newStore.link.split("://")[1] : undefined,
        images: newStore.images.map((elImage) => ({
          url: elImage,
          remote: true,
        })),
      });
      setStatus("loaded");
    };

    if (status === "loading") {
      load();
    }
  }, [reset, status, store]);

  const onEdit = async (data: Input) => {
    if (!authUser) {
      alert("Please sign in");
      push("/enter");
      throw new Error("auth user not found");
    }
    const editStore = httpsCallable(functions, "editStore");

    const imagePaths = [];

    for (const image of data.images) {
      // upload image
      const r = await uploadPath(image, {
        user: { id: authUser.id },
        target: { collection: "stores", id: store.id },
        type: "images",
      });

      imagePaths.push(r);
    }

    const newStore = {
      ...data,
      link: data.link ? "http://" + data.link : undefined,
      tags: [],
      id: store.id,
      images: imagePaths,
    };

    await editStore({
      store: newStore,
    });

    return store;
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      const store = await onEdit(data);

      if (onSuccess) {
        onSuccess(store);
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
      <FormSection title={"Edit store"} detail={"Please edit store info."}>
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
          help="Images for your store. The first image will be used as the thumbnail."
          message={errors.images?.message}
          {...register("images", { required: "Required" })}
          onChange={(paths) => setValue("images", paths)}
          defaultPaths={
            data?.images.map((elImage) => ({ url: elImage, remote: true })) ??
            []
          }
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
