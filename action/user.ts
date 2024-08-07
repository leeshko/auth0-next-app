"use server";

import { CredentialsSignin } from "next-auth";
import { signIn } from "@/auth";
import { redirect } from "next/navigation";
import connectDB from "@/lib/db";
import { User } from "@/models/User";
import { hash } from "bcryptjs";

export const login = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    await signIn("credentials", {
      redirect: false,
      callbackUrl: "/",
      email,
      password,
    });
  } catch (error) {
    const someError = error as CredentialsSignin;
    return someError.cause;
  }
  redirect("/");
};

export const register = async (formData: FormData) => {
  const firstName = formData.get("firstname") as string;
  const lastName = formData.get("lastname") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!firstName || !lastName || !email || !password) {
    throw new Error("Please fill all fields");
  }
  await connectDB();

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await hash(password, 10);

  await User.create({ firstName, lastName, email, password: hashedPassword });
  console.log("User created!!!");

  redirect("/login");
};
