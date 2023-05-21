import { Register } from "@prisma/client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Form from "../form/Form";
import FormDetail from "../form/FormDetail";
import FormLink from "../form/FormLink";
import FormSection from "../form/FormSection";
import FormText from "../form/FormText";

type Input = {
  email: string;
  name: string;
  detail: string;
  link: string;
};

type RegisterFormProps = {
  onSuccess?: (input: Register) => void | Promise<void>;
  onCancel?: () => void;
  className?: string;
};

export default function RegisterForm({
  onSuccess,
  onCancel,
  className,
}: RegisterFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Input>();

  const [submitting, setSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);

      const response = await fetch("api/register", {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      if (onSuccess) {
        const register = (await response.json()) as Register;
        onSuccess(register);
      }
    } catch (error) {
      alert("Please retry");
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
      <FormSection
        title={"Register product"}
        detail={"Tell us about your product."}
      >
        <FormText
          title="Name"
          help="How should we call you?"
          input={{ placeholder: "First Last", type: "text" }}
          message={errors.name?.message}
          {...register("name", {
            required: "Required",
          })}
        />
        <FormText
          title="Email"
          help="How should we contact you?"
          input={{ placeholder: "hello@airballoon.app", type: "text" }}
          message={errors.email?.message}
          {...register("email", {
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
        <FormDetail
          title="Other products"
          textArea={{ placeholder: "Detail" }}
          help="Which products would you like to be bundled with?"
          hint={"Optional"}
          message={errors.detail?.message}
          {...register("detail")}
        />
      </FormSection>
    </Form>
  );
}
