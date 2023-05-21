import { auth, firestore, functions } from "@/utils/Firebase";

import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, doc } from "firebase/firestore";
import { httpsCallable } from "firebase/functions";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Form from "../form/Form";
import FormSection from "../form/FormSection";
import FormText from "../form/FormText";

type Inputs = {
  displayName: string;
  password: string;
};

type SignUpFormProps = {
  email: string;
  onSuccess?: (input?: Inputs) => void | Promise<void>;
  onCancel?: () => void;
  className?: string;
};

export default function SignUpForm({
  onSuccess,
  onCancel,
  email,
  className,
}: SignUpFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [submitting, setSubmitting] = useState(false);

  const onSignUp = async (data: Inputs) => {
    const createUser = httpsCallable(functions, "createUser");
    const userDoc = doc(collection(firestore, "users"));

    await createUser({
      user: {
        email,
        password: data.password,
        displayName: data.displayName,
        id: userDoc.id,
      },
    });

    await signInWithEmailAndPassword(auth, email, data.password);

    alert("Signed in!");
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      await onSignUp(data);
      if (onSuccess) {
        onSuccess(data);
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
      <FormSection
        title={"Sign up"}
        detail={"Welcome! Please set your username and password to sign up."}
      />
      <FormText
        title="Username"
        input={{ placeholder: "Username", type: "text" }}
        message={errors.displayName?.message}
        {...register("displayName", {
          required: "Required",
          minLength: { value: 2, message: "Min length is 2" },
        })}
      />
      <FormText
        title="Password"
        input={{ placeholder: "Password", type: "password" }}
        message={errors.password?.message}
        {...register("password", {
          required: "Required",
          minLength: { value: 8, message: "Min length is 8" },
        })}
      />
    </Form>
  );
}
