import React from "react";
import { initValues, LOGO } from "../../../constants/seo";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-white rounded-lg shadow dark:bg-gray-900 m-4">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="flex items-center justify-star">
          <Link
            href="/"
            className="w-fit flex justify-start items-center space-x-3 rtl:space-x-reverse"
          >
            <div className="w-8 aspect-square relative">
              <Image
                src={LOGO}
                alt={`${initValues.title} Logo`}
                fill
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
