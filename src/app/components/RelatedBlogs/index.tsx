import { unstable_cache } from "next/cache";
import { getDatabases } from "../../../services/notion";
import { NotionDatabaseResult, Relation } from "../../../types/notion";
import { DefaultCard } from "../post";

interface Props {
  relations: Relation[];
}

const getPosts = unstable_cache(
  async () => {
    return await getDatabases(undefined, 1000);
  },
  ["posts"],
  { revalidate: 60, tags: ["posts"] }
);

export async function RelatedBlogs({ relations }: Props) {
  const allPosts = await getPosts();

  const related = relations
    .map(({ id }) =>
      (allPosts.results as unknown as NotionDatabaseResult[]).find(
        (post) => post.id === id
      )
    )
    .filter((post) => post);

  return (
    <div className="w-full mt-8 md:max-w-4xl lg:max-w-6xl">
      <h2 className="text-2xl font-bold mb-8">Relacionados</h2>
      {related.length > 0 && (
        <div className="w-full mx-auto grid justify-items-center gap-8 md:max-w-4xl md:grid-cols-[repeat(2,minmax(300px,500px))] lg:gap-6 lg:max-w-6xl lg:grid-cols-[repeat(3,minmax(300px,500px))]">
          {(related as NotionDatabaseResult[]).map((post) => (
            <DefaultCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
