import React from "react";
import { getBlocks, getDatabases, notion } from "../../../services/notion";
import { NotionDatabaseResult } from "../../../types/notion";
import { PostData } from "../../../types/post";
import Image from "next/image";
import { Metadata } from "next";
import { getMetadata } from "../../../utils/getMetadata";
import { defaultImageUrl } from "../../../constants/ssr";
import { notFound } from "next/navigation";
import { NotionRenderer } from "@notion-render/client";
import { RelatedBlogs } from "../../components/RelatedBlogs";

interface Props {
  params: { slug: string };
}

export const runtime = "edge";

export const revalidate = 60;

export const dynamicParams = false;

const getPostData = async (slug: string): Promise<PostData> => {
  const allPosts = await getDatabases(undefined, 1000);
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
    relatedBlogs: post?.properties.related_blogs.relation ?? [],
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

  if (!post) notFound();

  const renderer = new NotionRenderer({
    client: notion,
  });

  const html = await renderer.render(...post.content);

  return (
    <main className="w-full p-4 flex flex-col items-center justify-between">
      <article className="w-full flex flex-col items-center justify-between gap-5">
        <h1 className="font-semibold text-2xl">{post.title}</h1>
        <picture className="w-full my-8 aspect-video relative">
          <Image
            src={post.cover}
            alt={post.title}
            fill
            style={{
              objectFit: "cover",
            }}
          />
        </picture>
        <div
          className="w-full max-w-5xl flex flex-col prose prose-p:text-zinc-950 dark:prose-p:text-white prose-headings:text-zinc-950 dark:prose-headings:text-white prose-headings:font-semibold prose-h1:text-2xl  prose-h2:text-xl  prose-h3:text-lg prose-a:text-blue-500 prose-blockquote:text-zinc-900 dark:prose-blockquote:text-white prose-ul:pl-2 prose-li:list-none prose-li:text-zinc-950 dark:prose-li:text-white prose-figure:text-zinc-950 dark:prose-figure:text-white prose-figure:text-center prose-td:text-zinc-950 dark:prose-td:text-white prose-th:text-zinc-950 dark:prose-th:text-white"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </article>
      {post.relatedBlogs.length > 0 && (
        <RelatedBlogs relations={post.relatedBlogs} />
      )}
    </main>
  );
}
