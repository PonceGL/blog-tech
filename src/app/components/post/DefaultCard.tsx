import React from "react";
import { twMerge } from "tailwind-merge";
import { NotionDatabaseResult } from "../../../types/notion";
import Link from "next/link";
import Image from "next/image";
import { defaultImageUrl } from "../../../constants/ssr";
import { getTags } from "../../../services/notion";
import { Tags } from "./Tags";

interface Props {
  post: NotionDatabaseResult;
  className?: string;
}

export function DefaultCard({ post, className }: Props): JSX.Element {
  const { properties, cover } = post;
  const { tags } = getTags([post]);
  const link = properties.slug.rich_text[0]?.plain_text
    ? `/blog/${properties.slug.rich_text[0]?.plain_text}`
    : "#";
  return (
    <article
      className={twMerge(
        "w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700",
        className
      )}
    >
      <Link href={link} className="w-full">
        <div className="w-full aspect-video rounded-t-lg overflow-hidden relative">
          <Image
            src={cover?.external?.url ?? defaultImageUrl}
            alt={properties.title.title[0].plain_text}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{
              objectFit: "cover",
            }}
          />
        </div>
      </Link>
      <div className="p-5">
        <Link href={link}>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {properties.title.title[0].plain_text ?? "No title"}
          </h5>
        </Link>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {properties.description.rich_text[0]?.plain_text ?? "No description"}
        </p>
        <div className="w-full flex justify-between items-center gap-4">
          {tags.length > 0 && <Tags tags={tags} />}
        </div>
      </div>
    </article>
  );
}
