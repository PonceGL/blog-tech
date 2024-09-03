import { ButtonLink } from "../buttons/link";
import { Arrow } from "../icons/arrow";

interface Props {
  prev?: string;
  next?: string;
}

export function Pagination({ prev, next }: Props): JSX.Element {
  return (
    <div className="w-full max-w-6xl mx-auto flex justify-center items-center gap-8 lg:justify-start">
      {prev && (
        <ButtonLink
          link={prev}
          className="w-32 justify-center bg-slate-100 hover:bg-slate-200 focus:ring-slate-200 text-gray-800
         dark:bg-gray-800 dark:hover:bg-gray-900 dark:focus:ring-gray-800 dark:text-white"
        >
          <Arrow rotate />
          <span>Anterior</span>
        </ButtonLink>
      )}
      {next && (
        <ButtonLink
          link={next}
          className="w-32 justify-center bg-slate-100 hover:bg-slate-200 focus:ring-slate-200 text-gray-800
         dark:bg-gray-800 dark:hover:bg-gray-900 dark:focus:ring-gray-800 dark:text-white"
        >
          <span>Siguiente</span>
          <Arrow />
        </ButtonLink>
      )}
    </div>
  );
}
