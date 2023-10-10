import Link from "next/link";
import Image from "next/image";
import { useDictionary } from "@/lib/dictionary";

const CardProperty = ({ data }: any) => {
  const t = useDictionary();

  return (
    <div className="w-full" title={data.desc.title}>
      <Link href={`/property/${data.head.estateID}`}>
        <div className="shadow rounded-md">
          <div className="flex justify-center relative rounded-t-md overflow-hidden h-[260px] lg:h-[280px]">
            <Image
              className="object-full"
              src={data.desc.images[0]}
              alt={`${data.head.estateID}+${data.desc.images[0]}`}
              height={0}
              width={600}
              style={{ height: "auto", width: "100%", objectFit: "cover" }}
            />
            <div className="absolute top-2 right-2 text-sm font-semibold flex gap-1.5">
              <div className="flex py-1 px-2 items-center bg-white border rounded-md">
                <span className="text-blue-600">{t.CardPropertyNew}</span>
              </div>
              <div className="flex py-1 px-2 items-center bg-white border rounded-md">
                <span className="text-gray-600">{t.CardPropertySupporter}</span>
              </div>
            </div>

            <div className="absolute flex justify-between top-[45%] w-full px-2">
              <button className="w-9 h-9 bg-white rounded-full">prev</button>
              <button className="w-9 h-9 bg-white rounded-full">next</button>
            </div>
          </div>

          <div className="px-4 py-3 grid gap-1 text-gray-800 text-sm">
            {/* Price */}
            <div className="flex justify-between">
              <div className="flex">
                <div className="text-xl text-gray-800 font-bold">
                  {data.desc.curr} {data.desc.price.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CardProperty;