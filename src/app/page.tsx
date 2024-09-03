import { getDatabases } from "../services/notion";
import { unstable_cache } from "next/cache";
import { NotionDatabaseResult } from "../types/notion";
import { PostList } from "./components/postList";
import { Pagination } from "./components/pagination";
import { ACTION, CATEGORY, SCREEN } from "../types/analytics";
import { Analytics } from "./components/analytics";

export const revalidate = 60;

const getPosts = unstable_cache(
  async () => {
    return await getDatabases();
  },
  ["posts"],
  { revalidate: 60, tags: ["posts"] }
);
export default async function Home() {
  const allPosts = await getPosts();
  // const { tags } = getTags(
  //   allPosts.results as unknown as NotionDatabaseResult[]
  // );
  // console.log("====================================");
  // console.log("tags");
  // console.log(JSON.stringify(allPosts, null, 2));
  // console.log("====================================");

  return (
    <div className="w-full">
      <main className="w-full flex max-w-6xl mx-auto flex-col items-start justify-between p-4 gap-8 lg:px-0">
        {/* <main className="w-full min-h-screen max-w-[1500px] p-4 mx-auto grid grid-cols-1 gap-8 xl:grid-cols-[3fr,1fr]"> */}
        {(allPosts.results as unknown as NotionDatabaseResult[]) && (
          <PostList
            posts={allPosts.results as unknown as NotionDatabaseResult[]}
          />
        )}
        {/* <div className="w-full h-full min-h-32" /> */}
      </main>
      {allPosts.has_more && allPosts.next_cursor && (
        <Pagination next="/page/2" />
      )}
      <Analytics
        event={{
          action: ACTION.VIEW,
          category: CATEGORY.VIEW,
          label: `${ACTION.VIEW}_${SCREEN.HOME}`,
        }}
      />
    </div>
  );
}
