"use client";
import React, { useState } from "react";
import Logo from "../components/Logo";
import { LogOutIcon } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";

const LoginPage = () => {
  const { register, handleSubmit } = useForm();
  const [showPassword, setSetshowPassword] = useState(false);
  const signInWithCreds = async (data: any) => {
    toast.loading("Signining In", { id: "1" });
    try {
      await signIn("credentials", { ...data });
      toast.success("Signed In Successfully", { id: "1" });
    } catch (error) {
      console.log(error);
      toast.error("Error Signng In", { id: "1" });
    }
  };
  const passwordLessSignIn = async (type: "google" | "github") => {
    toast.loading("Signining In", { id: "1" });
    try {
      await signIn(type);
      toast.success("Signed In Successfully", { id: "1" });
    } catch (error) {
      console.log(error);
      toast.error("Error Signng In", { id: "1" });
    }
  };
  return (
    <section className="w-full h-full flex flex-col">
      <div className="mx-auto rounded-xl bg-slate-200 my-10 px-10 py-5">
        <div className="m-auto p-4 text-center">
          <span className="font-extrabold text-xl">Login To</span> <Logo />
        </div>
        <div className="flex flex-col">
          <label
            className="font-semibold text-2xl text-center text-slate-900"
            htmlFor="email"
          >
            Email
          </label>
          <div className="flex items-center justify-between bg-gray-100 my-4 px-6 py-4 rounded-xl text-gray-900 font-semibold">
            <input
              type="email"
              className="bg-transparent p-1 border-none outline-none"
              {...register("email")}
            />
          </div>
          <label
            className="font-semibold text-2xl text-center text-slate-900"
            htmlFor="password"
          >
            Password
          </label>
          <div className="flex items-center justify-between bg-gray-100 my-4 px-6 py-4 rounded-xl text-gray-900 font-semibold">
            <input
              type={showPassword ? "text" : "password"}
              className="bg-transparent p-1 border-none outline-none"
              {...register("password")}
            />
            {showPassword ? (
              <FiEyeOff
                onClick={() => setSetshowPassword((prev) => !prev)}
                size={30}
                className="ml-3 hover:bg-gray-200 cursor-pointer rounded-full p-2"
              />
            ) : (
              <FiEye
                onClick={() => setSetshowPassword((prev) => !prev)}
                size={30}
                className="ml-3 hover:bg-gray-200 cursor-pointer rounded-full p-2"
              />
            )}
          </div>
          <button
            onClick={handleSubmit(signInWithCreds)}
            className="my-2 font-bold border-[1px] bg-violet-500 text-white  hover:bg-violet-600 px-6 py-3 flex items-center justify-center gap-3 rounded-xl duration-300"
          >
            Login{" "}
            <span>
              <LogOutIcon />
            </span>
          </button>
          <button
            onClick={async () => passwordLessSignIn("google")}
            className="my-2 font-bold border-[1px] bg-slate-100  px-6 py-3 flex items-center justify-center gap-3 rounded-xl duration-300"
          >
            <FcGoogle size={30} />
            <span className="mx-auto text-lg text-slate-900">
              {" "}
              Continue With Google
            </span>
          </button>{" "}
          <button
            onClick={async () => passwordLessSignIn("github")}
            className="my-2 font-bold border-[1px] bg-slate-100   px-6 py-3 flex items-center justify-center gap-3 rounded-xl duration-300"
          >
            <FaGithub size={30} />
            <span className="mx-auto text-lg text-slate-900">
              Continue With GitHub
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
