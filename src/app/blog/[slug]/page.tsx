import React from "react";

interface Props {
  params: { slug: string };
}

export default function BlogPost({ params }: Props) {
  console.log("====================================");
  console.log("BlogPost: ", params);
  console.log("====================================");
  return (
    <main className="w-full p-4 flex flex-col items-center justify-between bg-rose-400">
      <h1 className="text-3xl ">BlogPost: {params.slug}</h1>
    </main>
  );
}
