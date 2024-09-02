import Link from "next/link";
import { NotionDatabaseResult } from "../../../types/notion";
import Image from "next/image";
import { defaultImageUrl } from "../../../constants/ssr";

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
      className={`w-full md:grid md:grid-cols-[1fr,2fr] bg-white border border-gray-200 shadow dark:border-gray-700 dark:bg-gray-800 rounded-lg overflow-hidden ${className}`}
    >
      <Link href={link} className="w-full aspect-square lg:aspect-[2/3]">
        <div className="w-full h-full relative">
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

      <div className="flex flex-col justify-between p-4 leading-normal">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {properties.title.title[0].plain_text ?? "No title"}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {properties.description.rich_text[0]?.plain_text ?? "No description"}
        </p>
        <Link
          href={link}
          className="w-fit inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Leer más
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </Link>
      </div>
    </article>
  );
}
