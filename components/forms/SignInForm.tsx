import { auth } from "@/utils/Firebase";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Form from "../form/Form";
import FormItem from "../form/FormItem";
import FormSection from "../form/FormSection";
import FormText from "../form/FormText";

type Inputs = {
  password: string;
};

type SignInFormProps = {
  email: string;
  onSuccess?: (input?: Inputs) => void | Promise<void>;
  onCancel?: () => void;
  className?: string;
};

export default function SignInForm({
  onSuccess,
  onCancel,
  email,
  className,
}: SignInFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [submitting, setSubmitting] = useState(false);

  const onSignIn = async (data: { password: string }) => {
    await signInWithEmailAndPassword(auth, email, data.password);

    alert("Signed in!");
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      await onSignIn(data);

      if (onSuccess) {
        onSuccess(data);
      }
    } catch (error) {
      alert(error);
    } finally {
      setSubmitting(false);
    }
  });

  const onForgot = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Please check your email to reset your password");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Form
      onSubmit={onSubmit}
      className={className}
      submitting={submitting}
      onCancel={onCancel}
    >
      <FormSection
        title={"Sign in"}
        detail={"Please enter your password to sign in."}
      >
        <FormText
          title="Password"
          input={{ placeholder: "Password", type: "password" }}
          message={errors.password?.message}
          {...register("password", {
            required: "Required",
            minLength: { value: 8, message: "Min length is 8" },
          })}
        />
        <FormItem>
          <Link
            href="#"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
            onClick={onForgot}
          >
            Forgot your password?
          </Link>
        </FormItem>
      </FormSection>
    </Form>
  );
}
