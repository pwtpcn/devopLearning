import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "devopLearning" },
    { name: "description", content: "just learning" },
  ];
};

export default function Index() {
  return (
    <div className="bg-[#FFF0D1] h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-[#664343] font-mono font-bold text-center text-2xl">
          Welcome to Catpuccino
        </h1>
        <br />
        <img
          tabIndex={0}
          src="https://i.pinimg.com/564x/b2/1a/77/b21a774a02a806fa07050cddc09edb3f.jpg"
          className="rounded-3xl w-60 hover:w-72 focus:w-20"
          style={{ transitionDuration: "0.5s" }}
        />
      </div>
      <div className="flex flex-col justify-center items-center">
        <br />
        <h2 className="text-[#664343] font-mono font-semibold">
          you want a cat?
        </h2>
        <h2 className="text-[#664343] font-mono font-semibold">or</h2>
        <h2 className="text-[#664343] font-mono font-semibold">
          you want a coffee?
        </h2>
      </div>
      <div className="fixed bottom-0">
        <h1 className="text-[#664343] font-mono font-semibold ">
          <a href="https://github.com/pwtpcn">
            <h1 className="text-[#664343] font-mono font-semibold ">Copyright © 2024 pwtpcn</h1>
          </a>
        </h1>
      </div>
    </div>
  );
}
