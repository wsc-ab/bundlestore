import ShipAware from "@/public/ShipAware.png";
import StageSet from "@/public/StageSet.svg";
import StanfordGSB from "@/public/StanfordGSB.png";
import APITable from "@/public/APITable.png";
import ToonGoose from "@/public/ToonGoose.png";
import Image from "next/image";

const logos = [
  { src: ShipAware, alt: "ShipAware" },
  { src: StanfordGSB, alt: "StanfordGSB" },
  { src: StageSet, alt: "StageSet" },
  { src: APITable, alt: "APITable" },
  { src: ToonGoose, alt: "ToonGoose" },
];

export default function Example() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-center text-lg font-semibold leading-8 text-gray-900">
          Trusted by the world’s most innovative teams
        </h2>
        <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
          {logos.map(({ src, alt }) => (
            <Image
              key={alt}
              className="col-span-2 max-h-12 w-full rounded bg-gray-400 object-contain p-1 lg:col-span-1"
              width={158}
              height={48}
              src={src}
              alt={alt}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
