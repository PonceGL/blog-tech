import Image from "next/image";
import { getDatabases } from "../services/notion";
import { unstable_cache } from "next/cache";
import { NotionDatabaseResult } from "../types/notion";
import Link from "next/link";
import { defaultImageUrl, revalidateTimeout } from "../constants/ssr";

const getPosts = unstable_cache(
  async () => {
    return await getDatabases();
  },
  ["posts"],
  { revalidate: revalidateTimeout, tags: ["posts"] }
);

export default async function Home() {
  const allPosts = await getPosts();

  return (
    <main className="w-full flex min-h-screen flex-col items-start justify-between p-4 lg:p-24 gap-8">
      <h1>BLOG</h1>
      {(allPosts.results as unknown as NotionDatabaseResult[]) && (
        <>
          {(allPosts.results as unknown as NotionDatabaseResult[]).map(
            ({ id, cover, properties }) => (
              <article
                key={id}
                className="w-full flex flex-col items-start justify-between gap-5"
              >
                <h2 className="font-semibold text-2xl">
                  {properties.title.title[0].plain_text ?? "No title"}
                </h2>
                <Link
                  href={
                    properties.slug.rich_text[0]?.plain_text
                      ? `/blog/${properties.slug.rich_text[0]?.plain_text}`
                      : "#"
                  }
                  className="w-full max-h-48 aspect-video relative"
                >
                  <Image
                    src={cover?.external?.url ?? defaultImageUrl}
                    alt={properties.title.title[0].plain_text}
                    fill
                    style={{
                      objectFit: "cover",
                    }}
                  />
                </Link>
                <p>
                  {properties.description.rich_text[0]?.plain_text ??
                    "No description"}
                </p>
              </article>
            )
          )}
        </>
      )}
    </main>
  );
}
