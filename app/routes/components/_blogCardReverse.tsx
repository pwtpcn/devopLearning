interface props {
  src: string;
  header: string;
  description: string;
}

export default function BlogCardReverse({ src, header, description }: props) {
  return (
    <div
      className="flex flex-row lg:justify-end lg:mr-96 justify-center w-svw gap-4 mt-4"
      style={{ transitionDuration: "0.5s" }}
    >
      <div className="flex flex-col">
        <h1 className="text-[#664343] font-mono font-bold text-2xl">
          {header}
        </h1>
        <h1 className="text-[#664343] font-mono font-semibold text-lg">
          {description}
        </h1>
      </div>
      <img src={src} className="w-60 rounded-2xl" />
    </div>
  );
}
