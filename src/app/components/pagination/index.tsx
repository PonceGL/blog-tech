import { ButtonLink } from "../buttons/link";
import { Arrow } from "../icons/arrow";

export function Pagination(): JSX.Element {
  return (
    <div className="w-full flex justify-center items-center gap-8">
      <ButtonLink link="#" className="w-32 justify-center">
        <Arrow rotate />
        <span>Previous</span>
      </ButtonLink>
      <ButtonLink link="#" className="w-32 justify-center">
        <span>Next</span>
        <Arrow />
      </ButtonLink>
    </div>
  );
}
