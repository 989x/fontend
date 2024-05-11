import Link from 'next/link';
import Image from 'next/image';
import { useDictionary } from "@/lib/dictionary";

interface BreadcrumbShortProps {
  linkHref: string;
  linkText: string;
  buttonText?: string; // Make optional
  buttonTextLoca?: string; // For translated text
}

interface BreadcrumbFullProps {
  label: string;
  url: string;
}

interface BreadcrumbsProps {
  breadcrumbs: BreadcrumbFullProps[];
  specialBreadcrumb?: BreadcrumbFullProps; 
}

export function BreadcrumbsShort({ linkHref, linkText, buttonText, buttonTextLoca }: BreadcrumbShortProps) {
  const t = useDictionary();

  return (
    <div className="flex flex-row justify-between items-center">
      <div className="text-sm text-gray-600 font-medium flex gap-1.5">
        <Link href={linkHref} className="flex gap-1 items-center">
          <Image
            src="/image/icon/breadcrumbs/backPage.svg"
            alt="me"
            width="0"
            height="0"
            style={{ width: "15px", height: "auto" }}
          />
          <div className="text-gray-800 font-semibold">{t[linkText]}</div>
        </Link>
        <div className="flex gap-1.5">
          <div className="text-gray-400 text-xs flex items-center"> / </div>
          <button>{buttonTextLoca ? t[buttonTextLoca] : buttonText}</button>
        </div>
      </div>
    </div>
  );
}

export function BreadcrumbsFull({ specialBreadcrumb, breadcrumbs }: BreadcrumbsProps) {
  const t = useDictionary();

  return (
    <div className="flex flex-row justify-between items-center">
      <div className="text-sm text-gray-600 font-medium flex gap-1.5">
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
        <div className="text-gray-400 text-xs flex items-center"> / </div>
        {/* regular breadcrumbs */}
        {breadcrumbs.map((breadcrumb, index) => (
          <div key={index} className="flex gap-1.5 items-center">
            {index > 0 && <div className="text-gray-400 text-xs flex items-center"> / </div>}
            <Link href={breadcrumb.url} className="hover:text-blue-600">
              {breadcrumb.label}
            </Link>
          </div>
        ))}
      </div>

      {/* Two button */}
      {/* ... */}
    </div>
  );
};