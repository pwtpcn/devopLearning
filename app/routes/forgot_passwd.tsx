import type { MetaFunction } from "@remix-run/node";
import { Link, redirect, useFetcher, useLoaderData } from "@remix-run/react";
import { ArrowBigDown, ArrowLeft, HomeIcon } from "lucide-react";
import { getSession } from "~/utils/session.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Catpuccino" },
    { name: "description", content: "just learning" },
  ];
};

interface ErrorMessage {
  message: string;
  status: number;
}

export default function ForgotPasswd() {
  const fetcher = useFetcher<ErrorMessage>();

  return (
    <div className="bg-[#FFF0D1] h-screen flex flex-col justify-center items-center overflow-x-hidden">
      <fetcher.Form
        method="post"
        className="bg-white h-fit w-fit p-10 rounded-md flex flex-col gap-3 justify-center items-center shadow-lg"
      >
        <div className="mb-[10px]">
          <h1 className="text-[#664343] font-bold text-center text-2xl">
            Forgot your password?
          </h1>
          <h1 className="text-[#9e9898] font-bold text-center">
            Enter your email to reset it!
          </h1>
        </div>
        <div className="w-full justify-start flex flex-col gap-2">
          <h1 className="text-[#664343] font-bold">Email</h1>
          <input
            name="email"
            type="email"
            className="bg-[#ffdfae] rounded-md pl-2 text-[#000000] placeholder:text-[#645b5b] border-[1px] border-black"
            placeholder="Enter your email"
          ></input>
        </div>
        <button
          className="bg-[#664343] h-fit w-full p-1 rounded-lg mt-2 hover:scale-105 transition-all active:scale-95"
          type="submit"
        >
          Confirm
        </button>
        <Link
          to="/login"
          className="w-full flex flex-row text-[#664343] hover:font-bold"
        >
          <ArrowLeft></ArrowLeft>
          <h1> Return back to login page</h1>
        </Link>
      </fetcher.Form>
    </div>
  );
}
