import type { PropsWithChildren } from "react";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

interface Props extends PropsWithChildren {
  link: string;
  className?: string;
}

export function ButtonLink({ link, className, children }: Props): JSX.Element {
  return (
    <Link
      href={link}
      className={twMerge(
        "inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-blue-800 transition-colors duration-300",
        className
      )}
    >
      {children}
    </Link>
  );
}
