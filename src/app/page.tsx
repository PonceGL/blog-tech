import { getDatabases, getTags } from "../services/notion";
import { unstable_cache } from "next/cache";
import { NotionDatabaseResult } from "../types/notion";
import { PostList } from "./components/postList";
import { Pagination } from "./components/pagination";

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
    <main className="w-full flex min-h-screen flex-col items-start justify-between p-4 gap-8">
      {/* <main className="w-full min-h-screen max-w-[1500px] p-4 mx-auto grid grid-cols-1 gap-8 xl:grid-cols-[3fr,1fr]"> */}
      {(allPosts.results as unknown as NotionDatabaseResult[]) && (
        <PostList posts={allPosts.results as unknown as NotionDatabaseResult[]}>
          {allPosts.has_more && allPosts.next_cursor && (
            <Pagination next="/posts/2" />
          )}
        </PostList>
      )}
      {/* <div className="w-full h-full min-h-32" /> */}
    </main>
  );
}
