"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
  toast,
} from "@heroui/react";
import { HiOutlineArrowLeft } from "react-icons/hi2";

import { authClient } from "@/lib/auth-client";

const SignInPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const email = formData.get("email");
    const password = formData.get("password");

    setIsLoading(true);

    try {
      const { error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        toast.danger("Sign in failed", {
          description: error.message || "Invalid email or password.",
        });

        return;
      }

      toast.success("Signed in successfully", {
        description: "Welcome back!",
      });

      form.reset();

      // Redirect after successful sign in
      router.push("/");
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
          <h1 className="text-3xl font-bold">Welcome back</h1>

          <p className="mt-2 text-sm text-default-500">
            Sign in to continue to your account.
          </p>
        </div>

        {/* Form */}
        <Form className="flex w-full flex-col gap-5" onSubmit={handleSubmit}>
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

              return null;
            }}
          >
            <div className="flex items-center justify-between">
              <Label>Password</Label>

              <Link
                href="/forgot-password"
                className="text-sm font-medium text-accent hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <Input placeholder="Enter your password" />

            <FieldError />
          </TextField>

          {/* Submit */}
          <Button type="submit" isPending={isLoading} className="mt-2 w-full">
            Sign in
          </Button>
        </Form>

        {/* Sign up */}
        <p className="mt-6 text-center text-sm text-default-500">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-semibold text-accent hover:underline"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
