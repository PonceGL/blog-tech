import { getDatabases } from "../services/notion";
import { unstable_cache } from "next/cache";
import { NotionDatabaseResult } from "../types/notion";
import { revalidateTimeout } from "../constants/ssr";
import { PostList } from "./components/postList";

export const runtime = "edge";

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
    <main className="w-full flex min-h-screen flex-col items-start justify-between p-4 gap-8">
      {/* <main className="w-full min-h-screen max-w-[1500px] p-4 mx-auto grid grid-cols-1 gap-8 xl:grid-cols-[3fr,1fr]"> */}
      {(allPosts.results as unknown as NotionDatabaseResult[]) && (
        <PostList
          posts={allPosts.results as unknown as NotionDatabaseResult[]}
        />
      )}
      {/* <div className="w-full h-full min-h-32" /> */}
    </main>
  );
}
