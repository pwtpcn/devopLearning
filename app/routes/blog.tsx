import { MetaFunction } from "@remix-run/react";

export const meta: MetaFunction = () => {
    return [
      { title: "Catpuccino" },
      { name: "description", content: "just learning" },
    ];
  };
  
export default function Blog(){
    return (
        <div className="bg-[#FFF0D1] h-screen flex flex-col justify-center items-center">
            <h1 className="text-[#664343] font-mono font-bold text-center text-2xl">
                page2
            </h1>
        </div>
    )
}