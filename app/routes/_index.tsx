import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getSession } from "~/utils/session.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Catpuccino" },
    { name: "description", content: "just learning" },
  ];
};

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request);
  const user = session.get("user") || { username: "Guest" }; // Default to "Guest" if not logged in

  return { user };
};

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function Index() {
  const { user } = useLoaderData<typeof loader>();

  return (
    <div className="bg-[#FFF0D1] h-screen flex flex-col justify-center items-center">
      <div className="fixed top-5 left-10">
        <Link
          to="/dashboard"
          prefetch="render"
          className="text-[#664343] font-bold hover:underline"
        >
          User : {user.username}
        </Link>
      </div>
      <div className="fixed top-5 right-10 flex flex-row gap-2">
        <Link to="/login" prefetch="render">
          <h1 className="text-[#664343] hover:font-bold">Login</h1>
        </Link>
        <h1 className="text-[#664343]">|</h1>
        <Link to="/register" prefetch="render">
          <h1 className="text-[#664343] hover:font-bold">Register</h1>
        </Link>
      </div>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-[#664343] font-mono font-bold text-center text-2xl">
          Welcome to Catpuccino
        </h1>
        <h1 className="text-[#664343] font-Poppins font-bold text-center text-2xl">
          Welcome to Catpuccino
        </h1>
        <br />
        <img
          tabIndex={0}
          src="https://i.pinimg.com/564x/b2/1a/77/b21a774a02a806fa07050cddc09edb3f.jpg"
          className="rounded-3xl w-60 hover:w-72 focus:w-20"
          style={{ transitionDuration: "0.5s" }}
        />
        <br />
        <h2 className="text-[#664343] font-mono font-semibold text-[20px]">
          you want a cat?
        </h2>
        <h2 className="text-[#664343] font-mono font-semibold text-[20px]">
          or
        </h2>
        <h2 className="text-[#664343] font-mono font-semibold text-[20px]">
          you want a coffee?
        </h2>
        <br />
        <Link
          to="/blog"
          prefetch="render"
          className="bg-[#3B3030] h-fit w-fit font-mono font-semibold text-[20px] p-2 rounded-2xl hover:scale-105 transition-all active:scale-95"
          style={{ transitionDuration: "0.4s" }}
        >
          Let's Go
        </Link>
      </div>
      <div className="fixed bottom-0">
        <h1 className="text-[#664343] font-mono font-semibold ">
          <a href="https://github.com/pwtpcn">
            <h1 className="text-[#664343] font-mono font-semibold ">
              Copyright © {new Date().getFullYear()} pwtpcn
            </h1>
          </a>
        </h1>
      </div>
    </div>
  );
}
