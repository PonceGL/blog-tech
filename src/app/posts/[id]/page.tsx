import { getDatabases, getPagination } from "../../../services/notion";
import { notFound } from "next/navigation";
import { NotionDatabaseResult } from "../../../types/notion";
import { PostList } from "../../components/postList";
import { Pagination } from "../../components/pagination";

interface Props {
  params: { id: string };
}

export const runtime = "edge";

export const revalidate = 60;

export const dynamicParams = false;

const getCurrentPage = async (id: string) => {
  try {
    const { pages } = await getPagination();
    const nextCursor = pages.find((page) => page.id === id);
    const allPosts = await getDatabases(nextCursor?.next);
    return allPosts;
  } catch (error) {
    throw new Error("Error fetching databases");
  }
};

export async function generateStaticParams() {
  const { pages } = await getPagination();

  return pages.map(({ id }) => ({
    id,
  }));
}

export default async function BlogPostList({ params }: Props) {
  const allPosts = await getCurrentPage(params.id);
  if (!allPosts.results) notFound();

  const prevPage =
    Number(params.id) - 1 <= 2
      ? "/"
      : `/posts/${String(Number(params.id) - 1)}`;
  const nextPage = allPosts.has_more
    ? `/posts/${String(Number(params.id) + 1)}`
    : undefined;

  return (
    <main className="w-full flex min-h-screen flex-col items-start justify-between p-4 gap-8">
      {(allPosts.results as unknown as NotionDatabaseResult[]) && (
        <PostList posts={allPosts.results as unknown as NotionDatabaseResult[]}>
          <Pagination prev={prevPage} next={nextPage} />
        </PostList>
      )}
    </main>
  );
}
