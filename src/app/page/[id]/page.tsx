import { getDatabases, getPagination } from "../../../services/notion";
import { notFound } from "next/navigation";
import { NotionDatabaseResult } from "../../../types/notion";
import { PostList } from "../../components/postList";
import { Pagination } from "../../components/pagination";
import { Analytics } from "../../components/analytics";
import { ACTION, CATEGORY, SCREEN } from "../../../types/analytics";
import { isNumeric } from "../../../utils/funtions";

interface Props {
  params: { id: string };
}

export const runtime = "edge";

export const revalidate = 60;

export const dynamicParams = false;

const getCurrentPage = async (id: string) => {
  if (!isNumeric(id)) notFound();
  const { pages } = await getPagination();
  const keys = pages.map(({ id }) => id);
  if (!keys.includes(id)) notFound();
  const nextCursor = pages.find((page) => page.id === id);
  if (!nextCursor?.next) notFound();
  const allPosts = await getDatabases(nextCursor?.next);
  return allPosts;
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
    Number(params.id) - 1 <= 2 ? "/" : `/page/${String(Number(params.id) - 1)}`;
  const nextPage = allPosts.has_more
    ? `/page/${String(Number(params.id) + 1)}`
    : undefined;

  return (
    <div className="w-full">
      <main className="w-full flex max-w-6xl mx-auto flex-col items-start justify-between p-4 gap-8 lg:px-0">
        {(allPosts.results as unknown as NotionDatabaseResult[]) && (
          <PostList
            posts={allPosts.results as unknown as NotionDatabaseResult[]}
          />
        )}
      </main>
      <Pagination prev={prevPage} next={nextPage} />
      <Analytics
        event={{
          action: ACTION.VIEW,
          category: CATEGORY.VIEW,
          label: `${ACTION.VIEW}_${SCREEN.PAGINATION}`,
          params: {
            page: params.id,
          },
        }}
      />
    </div>
  );
}
