import type {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { Link, redirect, useLoaderData } from "@remix-run/react";
import { HomeIcon } from "lucide-react";
import { requireUserSession } from "~/utils/auth.server";
import { logout } from "~/utils/logout.server";
import { destroySession, getSession } from "~/utils/session.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Catpuccino" },
    { name: "description", content: "just learning" },
  ];
};

// export async function loader({ request }: { request: Request }) {
//   const session = await getSession(request);
//   const user = session.get("user");

//   if (!user) {
//     return redirect("/login");
//   }

//   return {
//     message: "",
//     user: user,
//   };
// }

export const loader: LoaderFunction = async ({ request }) => {
  const session = await requireUserSession({ request });

  return session; // Will contain the user if authenticated
};

export const action: ActionFunction = async ({ request }) => {
  const session = logout({ request });
  return session;
};

export default function Index() {
  const { user } = useLoaderData<typeof loader>();

  return (
    <div className="bg-[#FFF0D1] h-screen flex flex-col justify-center items-center gap-3">
      <h1 className="text-[#664343] font-bold">Welcome {user.username}</h1>
      <h1 className="text-[#664343] font-bold">
        Account Created: {new Date(user.create_date).toLocaleDateString()}
      </h1>
      <div className="flex flex-row gap-3">
        <h1 className="text-[#664343] font-bold">Go back to home page</h1>
        <Link to="/" prefetch="render">
          <HomeIcon className="text-[#664343]"></HomeIcon>
        </Link>
      </div>
      <form method="post">
        <button
          type="submit"
          className="bg-[#3B3030] h-fit w-fit p-2 rounded-xl font-bold hover:text-[20px]"
          style={{ transitionDuration: "0.4s" }}
        >
          Logout
        </button>
      </form>
    </div>
  );
}
