import Link from "next/link";
import { twMerge } from "tailwind-merge";
import Image from "next/image";
import { NotionDatabaseResult } from "../../../types/notion";
import { defaultImageUrl } from "../../../constants/ssr";
import { ButtonLink } from "../buttons/link";
import { Arrow } from "../icons/arrow";

interface Props {
  post: NotionDatabaseResult;
  className?: string;
}

export function MainCard({
  post: { cover, properties },
  className,
}: Props): JSX.Element {
  const link = properties.slug.rich_text[0]?.plain_text
    ? `/blog/${properties.slug.rich_text[0]?.plain_text}`
    : "#";

  return (
    <article
      className={twMerge(
        "w-full md:grid md:grid-cols-[1fr,2fr] bg-white border border-gray-200 shadow dark:border-gray-700 dark:bg-gray-800 rounded-lg overflow-hidden",
        className
      )}
    >
      <Link href={link} className="w-full aspect-square lg:aspect-[2/3]">
        <div className="w-full h-full relative">
          <Image
            src={cover?.external?.url ?? defaultImageUrl}
            alt={properties.title.title[0].plain_text}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
      </Link>

      <div className="flex flex-col justify-between p-4 leading-normal">
        <Link href={link}>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {properties.title.title[0].plain_text ?? "No title"}
          </h5>
        </Link>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {properties.description.rich_text[0]?.plain_text ?? "No description"}
        </p>
        <ButtonLink link={link} className="w-fit">
          <span>Leer más</span>
          <Arrow />
        </ButtonLink>
      </div>
    </article>
  );
}
