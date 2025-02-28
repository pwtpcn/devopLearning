import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Catpuccino" },
    { name: "description", content: "just learning" },
  ];
};

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function Index() {
  return (
    <div className="bg-[#FFF0D1] h-screen flex flex-col justify-center items-center">
      <h1 className="text-[#664343] font-bold">
        Forgot Password Page
      </h1>
    </div>
  );
}
