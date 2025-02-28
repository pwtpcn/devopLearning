import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { HomeIcon } from "lucide-react";

export const meta: MetaFunction = () => {
  return [
    { title: "Catpuccino" },
    { name: "description", content: "just learning" },
  ];
};

export default function Index() {
  return (
    <div className="bg-[#FFF0D1] h-screen flex flex-col justify-center items-center gap-3">
      <h1 className="text-[#664343] font-bold">Forgot Password Page</h1>
      <div className="flex flex-row gap-3">
        <h1 className="text-[#664343] font-bold">Go back to home page</h1>
        <Link to="/" prefetch="render">
          <HomeIcon className="text-[#664343]"></HomeIcon>
        </Link>
      </div>
    </div>
  );
}
