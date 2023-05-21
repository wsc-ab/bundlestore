import { CheckEmail } from "@/types";
import { functions } from "@/utils/Firebase";
import { httpsCallable } from "firebase/functions";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Form from "../form/Form";
import FormSection from "../form/FormSection";
import FormText from "../form/FormText";

type Inputs = {
  email: string;
};

type CheckEmailFormProps = {
  onSuccess: ({
    email,
    status,
  }: {
    email: string;
    status: CheckEmail["output"]["user"]["status"];
  }) => void;
  onCancel: () => void;
  className?: string;
};

export default function CheckEmailForm({
  onSuccess,
  onCancel,
  className,
}: CheckEmailFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [submitting, setSubmitting] = useState(false);

  const onEnter = async ({ email }: { email: string }) => {
    const checkEmail = httpsCallable(functions, "checkEmail");

    const {
      data: {
        user: { status },
      },
    } = (await checkEmail({ user: { email } })) as {
      data: CheckEmail["output"];
    };

    return { email, status };
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      const status = await onEnter(data);
      onSuccess(status);
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
      <FormSection
        title={"Enter"}
        detail={"Please enter your email to sign in or up."}
      >
        <FormText
          title="Email"
          input={{ placeholder: "hello@airballoon.app", type: "email" }}
          message={errors.email?.message}
          {...register("email", {
            required: "Required",
          })}
        />
      </FormSection>
    </Form>
  );
}
