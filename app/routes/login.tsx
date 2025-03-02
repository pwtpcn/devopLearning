import {
  Link,
  MetaFunction,
  useFetcher,
  useLoaderData,
} from "@remix-run/react";
import db from "~/utils/database.server";
import { ActionFunctionArgs } from "@remix-run/node";
import Arrow from "~/svg/arrow";
import { commitSession, getSession } from "~/utils/session.server";

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

//400 user error
//500 server error
//300 redirect
//200 ok

export async function action({ request }: ActionFunctionArgs) {
  try {
    const formData = await request.formData();
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    if (!username) {
      return {
        message: "Please input username",
        status: 401,
      };
    } else if (!password) {
      return {
        message: "Please input password",
        status: 401,
      };
    }

    // const userRepository = new UserRepository();
    // const user = await userRepository.login(username, password);

    const response = await fetch("http://localhost:3000/api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    let result;
    try {
      result = await response.json();
    } catch (error) {
      return {
        message: "Invalid response from server",
        status: response.status,
      };
    }

    const user = result.user;

    if (!user) {
      return { message: "Invalid username or password", status: 401 };
    }

    // Store user session
    const session = await getSession(request);
    session.set("user", {
      username: user.username,
      user_photo: user.profile_image_url,
      create_date: user.createdAt,
    });

    //Debug log
    console.log("User logged in: ", user);

    return new Response(null, {
      status: 302,
      headers: {
        "Set-Cookie": await commitSession(session),
        Location: "/account",
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return { message: "Internal Server Error", status: 500 };
  }
}

export default function Login() {
  const fetcher = useFetcher<ErrorMessage>();
  return (
    <div className="bg-[#FFF0D1] h-screen flex flex-col justify-center items-center overflow-x-hidden">
      <Link to="/" prefetch="render" className="fixed top-5 left-5 rotate-180">
        <Arrow />
      </Link>
      <fetcher.Form
        method="post"
        className="bg-white h-fit w-fit p-10 rounded-md flex flex-col gap-3 justify-center items-center"
      >
        <div className="mb-[10px]">
          <h1 className="text-[#664343] font-mono font-bold text-center text-2xl">
            Welcome to Catpuccino
          </h1>
          <h1 className="text-[#664343] font-mono font-bold text-2xl">
            Sign into your account
          </h1>
        </div>
        <div className="flex flex-row gap-5">
          <h1 className="text-[#664343] font-mono font-bold text-center text-xl w-[90px]">
            Username
          </h1>
          <input
            name="username"
            type="text"
            className="bg-[#ffdfae] rounded-md pl-2 text-[#000000] placeholder:text-[#645b5b] border-[1px] border-black"
            placeholder="userxxx"
          ></input>
        </div>
        <div className="flex flex-row gap-5">
          <h1 className="text-[#664343] font-mono font-bold text-center text-xl w-[90px]">
            Password
          </h1>
          <input
            name="password"
            type="password"
            className="bg-[#ffdfae] rounded-md pl-2 text-[#000000] placeholder:text-[#645b5b] border-[1px] border-black"
            placeholder="******"
          ></input>
        </div>
        {fetcher.data?.message && (
          <h1
            className={`${
              fetcher.data.status == 200 ? "text-green-400" : "text-red-500"
            }`}
          >
            {fetcher.data.message}
          </h1>
        )}
        <div className="w-full justify-end flex">
          <Link
            to="/forgot_passwd"
            className="text-[#664343] text-s underline hover:font-bold"
          >
            forgot password?
          </Link>
        </div>
        <button
          className="bg-[#664343] h-fit w-full p-1 rounded-lg mt-2 hover:scale-105 transition-all active:scale-95"
          type="submit"
        >
          Login
        </button>
        <div className="flex flex-row gap-4">
          <h1 className="text-[#664343]">Don't have an account?</h1>
          <Link
            to="/register"
            prefetch="render"
            className="text-[#664343] underline font-bold"
          >
            Register
          </Link>
        </div>
      </fetcher.Form>
    </div>
  );
}
