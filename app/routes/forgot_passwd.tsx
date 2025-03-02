import type { MetaFunction } from "@remix-run/node";
import { Link, redirect, useFetcher, useLoaderData } from "@remix-run/react";
import { HomeIcon } from "lucide-react";
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
        className="bg-white h-fit w-fit p-10 rounded-md flex flex-col gap-3 justify-center items-center"
      >
          <h1 className="text-[#664343] font-mono font-bold text-center text-2xl">
            Reset your password
          </h1>
        <div>
        </div>
      </fetcher.Form>
    </div>
  );
}
