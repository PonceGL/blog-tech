import type { PropsWithChildren } from "react";
import { NotionDatabaseResult } from "../../types/notion";
import { DefaultCard, MainCard } from "./post";

interface Props extends PropsWithChildren {
  posts: NotionDatabaseResult[];
}

export function PostList({ posts, children }: Props): JSX.Element {
  const firstPost = posts[0];
  const lastPost = posts.filter((p) => p.id !== firstPost.id);

  return (
    <div className="w-full mx-auto grid justify-items-center gap-8 md:grid-cols-[repeat(2,minmax(300px,500px))] lg:gap-6 lg:grid-cols-[repeat(3,minmax(300px,500px))]">
      <MainCard post={firstPost} className="hidden md:col-span-2" />
      <DefaultCard post={firstPost} className="block md:hidden" />
      {lastPost.map((post) => (
        <DefaultCard key={post.id} post={post} />
      ))}
      {children}
    </div>
  );
}
