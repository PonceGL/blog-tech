import { twMerge } from "tailwind-merge";
import { MultiSelect } from "../../../types/notion";
import { COLOR_BY_TYPE } from "../../../constants/styles";

interface Props {
  tags: MultiSelect[];
}

export function Tags({ tags }: Props): JSX.Element {
  return (
    <div className="w-full flex justify-end items-center gap-x-2">
      {tags.map(({ id, name, color }) => (
        <span
          key={id}
          className={twMerge(
            "text-xs font-medium px-2.5 py-0.5 rounded border",
            COLOR_BY_TYPE[color]
          )}
        >
          {name}
        </span>
      ))}
      <input
        type="hidden"
        name="blue"
        className="bg-blue-300 text-blue-800 border-blue-800"
      />
      <input
        type="hidden"
        name="brown"
        className="bg-amber-300 text-amber-800 border-amber-800"
      />
      <input
        type="hidden"
        name="default"
        className="bg-slate-300 text-slate-800 border-slate-800"
      />
      <input
        type="hidden"
        name="gray"
        className="bg-gray-300 text-gray-800 border-gray-800"
      />
      <input
        type="hidden"
        name="green"
        className="bg-green-300 text-green-800 border-green-800"
      />
      <input
        type="hidden"
        name="orange"
        className="bg-orange-300 text-orange-800 border-orange-800"
      />
      <input
        type="hidden"
        name="pink"
        className="bg-pink-300 text-pink-800 border-pink-800"
      />
      <input
        type="hidden"
        name="purple"
        className="bg-purple-300 text-purple-800 border-purple-800"
      />
      <input
        type="hidden"
        name="red"
        className="bg-red-300 text-red-800 border-red-800"
      />
      <input
        type="hidden"
        name="yellow"
        className="bg-yellow-300 text-yellow-800 border-yellow-800"
      />
    </div>
  );
}
