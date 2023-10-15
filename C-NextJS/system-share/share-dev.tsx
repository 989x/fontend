import Link from 'next/link';
import Image from 'next/image';
import { useDictionary } from "@/lib/dictionary";

interface BreadcrumbFullProps {
  label: string;
  url: string;
}

interface BreadcrumbsProps {
  breadcrumbs: BreadcrumbFullProps[];
  specialBreadcrumb?: BreadcrumbFullProps; 
}

export function BreadcrumbsFull({ specialBreadcrumb, breadcrumbs }: BreadcrumbsProps) {
  const t = useDictionary();

  return (
    <div className="flex flex-row justify-between items-center -mt-[9px] mb-[20px]">
      <div className="text-sm text-gray-600 font-medium flex gap-[7px]">
        {specialBreadcrumb && (
          <Link href={specialBreadcrumb.url} className="flex gap-1 items-center">
            <Image
              src="/image/icon/breadcrumbs/backPage.svg"
              alt="me"
              width="0"
              height="0"
              style={{ width: "15px", height: "auto" }}
            />
            <div className="text-gray-800 font-semibold">
              {t[specialBreadcrumb.label]}
            </div>
          </Link>
        )}
        <div className="hidden sm:flex items-center text-gray-400 text-xs"> / </div>
        {/* regular breadcrumbs */}
        {breadcrumbs.map((breadcrumb, index) => (
          <div key={index} className="hidden sm:flex gap-[7px] items-center">
            {index > 0 && <div className="text-gray-400 text-xs flex items-center"> / </div>}
            <Link href={breadcrumb.url} className="hover:text-blue-600">
              {breadcrumb.label}
            </Link>
          </div>
        ))}
      </div>

      {/* 2 button */}
      <div className="font-medium text-gray-600 text-sm flex gap-4 sm:gap-6">
        <button className="flex items-center">
          <Image
            src="/image/icon/page-property/share.svg"
            alt="me"
            width="0"
            height="0"
            style={{ width: "20px", height: "auto" }}
          />
          <button className='ml-2'>
            Share
          </button>
        </button>
        <button className="flex items-center">
          <Image
            src="/image/icon/page-property/favorite.svg"
            alt="me"
            width="0"
            height="0"
            style={{ width: "18px", height: "auto" }}
          />
          <button className='ml-2'>
            Favorite
          </button>
        </button>
      </div>
    </div>
  );
};