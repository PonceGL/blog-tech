"use client";
import Image from "next/image";
import { IMAGE_404 } from "../constants/seo";
import { Analytics } from "./components/analytics";
import { ACTION, CATEGORY, SCREEN } from "../types/analytics";
import { ButtonLink } from "./components/buttons/link";
import { usePathname } from "next/navigation";

export default function NotFound() {
  const pathname = usePathname();
  return (
    <section className="h-[80svh] w-full p-4 flex flex-col justify-center items-center bg-white dark:bg-gray-900">
      <div className="w-full h-full mx-auto max-w-screen-xl">
        <div className="h-full mx-auto flex flex-col justify-center items-center">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">
            404
          </h1>
          <picture className="w-full h-full my-8 aspect-video block rounded-lg relative overflow-hidden">
            <Image
              src={IMAGE_404}
              alt="que_paso_amiguito_meme"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{
                objectFit: "contain",
              }}
            />
          </picture>

          <ButtonLink
            link="/"
            className="w-32 justify-center cursor-pointer bg-slate-100 hover:bg-slate-200 focus:ring-slate-200 text-gray-800
         dark:bg-gray-800 dark:hover:bg-gray-900 dark:focus:ring-gray-800 dark:text-white"
          >
            Volver al inicio
          </ButtonLink>
        </div>
      </div>
      <Analytics
        event={{
          action: ACTION.VIEW,
          category: CATEGORY.VIEW,
          label: `${ACTION.VIEW}_${SCREEN.NOT_FOUND}`,
          params: {
            pathname: pathname.replace("/", ""),
          },
        }}
      />
    </section>
  );
}
