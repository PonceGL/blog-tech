import React from "react";
import { NotionDatabaseResult } from "../../../types/notion";
import Link from "next/link";
import Image from "next/image";
import { defaultImageUrl } from "../../../constants/ssr";
import { ButtonLink } from "../buttons/link";
import { Arrow } from "../icons/arrow";

interface Props {
  post: NotionDatabaseResult;
  className?: string;
}

export function DefaultCard({
  post: { cover, properties },
  className,
}: Props): JSX.Element {
  const link = properties.slug.rich_text[0]?.plain_text
    ? `/blog/${properties.slug.rich_text[0]?.plain_text}`
    : "#";
  return (
    <article
      className={`max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ${className}`}
    >
      <Link href={link} className="w-full">
        <div className="w-full aspect-video rounded-t-lg overflow-hidden relative">
          <Image
            src={cover?.external?.url ?? defaultImageUrl}
            alt={properties.title.title[0].plain_text}
            fill
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
        <ButtonLink link={link}>
          <span>Leer más</span>
          <Arrow />
        </ButtonLink>
      </div>
    </article>
  );
}
