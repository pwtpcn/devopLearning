import { Link, MetaFunction } from "@remix-run/react";
import BlogCard from "./_blogCard";
import BlogCardReverse from "./_blogCardReverse";

export const meta: MetaFunction = () => {
  return [
    { title: "Catpuccino" },
    { name: "description", content: "just learning" },
  ];
};

export default function Blog() {
  return (
    <div className="bg-[#FFF0D1] h-screen flex flex-col justify-center items-center overflow-x-hidden">
      <Link to="/">
      <div className="fixed top-4 left-4 scale-x-[-1]">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="hover:fill-[#664343]">
          <path d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z" />
        </svg>
      </div>
      </Link>
      <h1 className="text-[#664343] font-mono font-bold text-center text-2xl fixed top-4">
        blog
      </h1>
      <div className="mb-72" />
      <BlogCard
        src="https://i.pinimg.com/564x/6b/e0/c6/6be0c67e6905e42fc9e3d07eb10dedf3.jpg"
        header="hello"
        description="let's go drink coffee"
      />
      <BlogCardReverse
        src="https://i.pinimg.com/236x/66/14/0f/66140fe854b349b6b0c05a81622cbe61.jpg"
        header="hello"
        description="let's go drink coffee"
      />
      <BlogCard
        src="https://i.pinimg.com/originals/32/32/54/323254e4d39d8bac1589ca5e55b8be3a.gif"
        header="hello"
        description="let's go drink coffee"
      />
      <BlogCardReverse
        src="https://i.pinimg.com/236x/c4/ce/73/c4ce7310227fb44874212761b036213c.jpg"
        header="hello"
        description="let's go drink coffee"
      />
    </div>
  );
}
