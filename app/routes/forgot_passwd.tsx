import type { MetaFunction } from "@remix-run/node";
import { Link, redirect, useLoaderData } from "@remix-run/react";
import { HomeIcon } from "lucide-react";
import { getSession } from "~/utils/session.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Catpuccino" },
    { name: "description", content: "just learning" },
  ];
};

export async function loader({ request }: { request: Request }) {
  const session = await getSession(request);
  const user = session.get("user");

  if (!user) {
    return redirect("/login");
  }

  return {
    message: "",
    user: user,
  };
}

export default function Index() {
    const { user } = useLoaderData<typeof loader>();

  return (
    <div className="bg-[#FFF0D1] h-screen flex flex-col justify-center items-center gap-3">
      <h1 className="text-[#664343] font-bold">Hello {user.username}</h1>
      <h1 className="text-[#664343] font-bold">This is forgot password page</h1>
      <div className="flex flex-row gap-3">
        <h1 className="text-[#664343] font-bold">Go back to home page</h1>
        <Link to="/" prefetch="render">
          <HomeIcon className="text-[#664343]"></HomeIcon>
        </Link>
      </div>
    </div>
  );
}
