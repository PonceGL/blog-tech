// import { unstable_cache } from "next/cache";
import React from "react";
import { getBlocks, getDatabases } from "../../../services/notion";
import { NotionDatabaseResult } from "../../../types/notion";
import { PostData } from "../../../types/post";
import Image from "next/image";
import { Metadata } from "next";
import { getMetadata } from "../../../utils/getMetadata";
import { defaultImageUrl, revalidateTimeout } from "../../../constants/ssr";

interface Props {
  params: { slug: string };
}

export const revalidate = revalidateTimeout;

export const dynamicParams = false;

const getPostData = async (slug: string): Promise<PostData> => {
  const allPosts = await getDatabases();
  const post = (allPosts.results as unknown as NotionDatabaseResult[]).find(
    (post) => post.properties.slug.rich_text[0].plain_text === slug
  );
  return {
    id: post?.id ?? "",
    title: post?.properties.title.title[0].plain_text ?? "No title",
    cover: post?.cover?.external?.url ?? defaultImageUrl,
    description:
      post?.properties.description.rich_text[0]?.plain_text ?? "No description",
    content: await getBlocks(post?.id ?? ""),
  };
};

export async function generateStaticParams() {
  const allPosts = await getDatabases();

  return (allPosts.results as unknown as NotionDatabaseResult[]).map(
    (post) => ({
      slug: post.properties.slug.rich_text[0].plain_text,
    })
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostData(params.slug);

  return {
    ...getMetadata({
      title: post.title,
      image: post.cover,
      description: post.description,
    }),
  };
}

export default async function BlogPost({ params }: Props) {
  const post = await getPostData(params.slug);

  return (
    <main className="w-full p-4 flex flex-col items-center justify-between">
      <article className="w-full flex flex-col items-center justify-between p-4 gap-5">
        <h1 className="font-semibold text-2xl">{post.title}</h1>
        <picture className="w-full aspect-video relative">
          <Image
            src={post.cover}
            alt={post.title}
            fill
            style={{
              objectFit: "cover",
            }}
          />
        </picture>
      </article>
    </main>
  );
}
