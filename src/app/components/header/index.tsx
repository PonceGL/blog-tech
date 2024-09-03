import React from "react";
import { initValues, LOGO } from "../../../constants/seo";
import Link from "next/link";
import Image from "next/image";

export function Header() {
  return (
    <header className="bg-white rounded-lg shadow dark:bg-gray-900 m-4">
      <div className="w-full max-w-6xl mx-auto p-4 lg:px-0">
        <div className="flex items-center justify-star">
          <Link
            href="/"
            className="w-fit flex justify-start items-center space-x-3 rtl:space-x-reverse"
          >
            <div className="w-8 aspect-square relative lg:w-12">
              <Image
                src={LOGO}
                alt={`${initValues.title} Logo`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
            <span className="text-2xl font-semibold whitespace-nowrap dark:text-white">
              {initValues.title}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
