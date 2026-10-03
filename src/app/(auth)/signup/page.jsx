"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
  toast,
} from "@heroui/react";
import { HiOutlineArrowLeft } from "react-icons/hi2";

import { authClient } from "@/lib/auth-client";

const SignUpPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    setIsLoading(true);

    try {
      const { error } = await authClient.signUp.email({
        name,
        email,
        password,
      });

      if (error) {
        toast.danger("Sign up failed", {
          description: error.message || "Unable to create your account.",
        });

        return;
      }

      toast.success("Account created successfully", {
        description: "Welcome! Your account is ready.",
      });
      form.reset();
      //   e.currentTarget.reset();
    } catch (error) {
      toast.danger("Something went wrong", {
        description: "Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-5 py-10">
      <div className="w-full max-w-md">
        {/* Back */}
        <Button variant="ghost" className="mb-6" onPress={() => router.back()}>
          <HiOutlineArrowLeft className="text-lg" />
          Back
        </Button>

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Create an account</h1>

          <p className="mt-2 text-sm text-default-500">
            Create your account to start applying for jobs.
          </p>
        </div>

        {/* Form */}
        <Form className="flex w-full flex-col gap-5" onSubmit={handleSubmit}>
          {/* Name */}
          <TextField
            isRequired
            name="name"
            type="text"
            validate={(value) => {
              if (value.trim().length < 2) {
                return "Name must be at least 2 characters";
              }

              return null;
            }}
          >
            <Label>Name</Label>

            <Input placeholder="John Doe" />

            <FieldError />
          </TextField>

          {/* Email */}
          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "Please enter a valid email address";
              }

              return null;
            }}
          >
            <Label>Email</Label>

            <Input placeholder="john@example.com" />

            <FieldError />
          </TextField>

          {/* Password */}
          <TextField
            isRequired
            minLength={8}
            name="password"
            type="password"
            validate={(value) => {
              if (value.length < 8) {
                return "Password must be at least 8 characters";
              }

              if (!/[A-Z]/.test(value)) {
                return "Password must contain at least one uppercase letter";
              }

              if (!/[0-9]/.test(value)) {
                return "Password must contain at least one number";
              }

              return null;
            }}
          >
            <Label>Password</Label>

            <Input placeholder="Enter your password" />

            <Description>
              Must be at least 8 characters with 1 uppercase letter and 1
              number.
            </Description>

            <FieldError />
          </TextField>

          {/* Submit */}
          <Button type="submit" isPending={isLoading} className="mt-2 w-full">
            Create account
          </Button>
        </Form>

        {/* Sign in */}
        <p className="mt-6 text-center text-sm text-default-500">
          Already have an account?{" "}
          <Link
            href="/signin"
            className="font-semibold text-accent hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
