import Link from "next/link";
import Image from "next/image";
import { useState } from "react"; // Import useState
import { useDictionary } from "@/lib/dictionary";

export function BreadcrumbsFull({
  specialBreadcrumb,
  breadcrumbs,
  sharedProperty,
}: {
  specialBreadcrumb?: {
    label: string;
    url: string;
  };
  breadcrumbs: {
    label: string;
    url: string;
  }[];
  sharedProperty: {
    imageUrl: string;
    name: string;
    description: string;
    propertyLink: string;
  };
}) {
  const t = useDictionary();
  // Unique state for share modal visibility
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [isCopySuccessModalOpen, setCopySuccessModalOpen] = useState(false);

  const openShareModal = () => {
    setShareModalOpen(true);
  };

  const closeShareModal = () => {
    setShareModalOpen(false);
  };
  
  const openCopySuccessModal = () => {
    setCopySuccessModalOpen(true);
    // Close the modal after a certain duration
    setTimeout(() => {
      setCopySuccessModalOpen(false);
    }, 2000); // Close the modal after 2 seconds (adjust as needed)
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(sharedProperty.propertyLink);
      openCopySuccessModal();
    } catch (err) {
      console.error('Unable to copy to clipboard', err);
    }
  };

  return (
    <div className="flex flex-row justify-between items-center -mt-[9px] mb-[20px]">
      <div className="text-sm text-gray-600 font-medium flex gap-[7px]">
        {specialBreadcrumb && (
          <Link
            href={specialBreadcrumb.url}
            className="flex gap-1 items-center"
          >
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
        <div className="hidden sm:flex items-center text-gray-400 text-xs">
          {" "}
          /{" "}
        </div>
        {/* regular breadcrumbs */}
        {breadcrumbs.map((breadcrumb, index) => (
          <div key={index} className="hidden sm:flex gap-[7px] items-center">
            {index > 0 && (
              <div className="text-gray-400 text-xs flex items-center"> / </div>
            )}
            <Link href={breadcrumb.url} className="hover:text-blue-600">
              {breadcrumb.label}
            </Link>
          </div>
        ))}
      </div>

      {/* Share and Favorite button */}
      <div className="font-medium text-gray-600 text-sm flex gap-4 sm:gap-6">
        {/* Share button */}
        <button className="flex items-center" onClick={openShareModal}>
          <Image
            src="/image/icon/page-property/share.svg"
            alt="me"
            width="0"
            height="0"
            style={{ width: "20px", height: "auto" }}
          />
          <button className="ml-2">Share</button>
        </button>

        {/* Favorite button */}
        <button className="flex items-center">
          <Image
            src="/image/icon/page-property/favorite.svg"
            alt="me"
            width="0"
            height="0"
            style={{ width: "18px", height: "auto" }}
          />
          <button className="ml-2">Favorite</button>
        </button>

        {/* Share Modal */}
        {shareModalOpen && (
          <div className="z-10 fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded-lg max-w-[440px] space-y-5">
              <div className="flex justify-between items-center">
                <p className="text-gray-800 text-lg">Share this property</p>
                <button onClick={closeShareModal}>Close</button>
              </div>
              <div className="flex justify-center gap-3 items-center">
                <div className="h-[90px] min-w-[130px] max-w-[130px] border rounded-lg">
                  <Image
                    src={sharedProperty.imageUrl}
                    alt="Property Image"
                    width={130}
                    height={90}
                    className="rounded-lg"
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
                <div className="space-y-2">
                  <p className="text-gray-800">{sharedProperty.name}</p>
                  <p className="text-gray-500 text-sm font-normal">
                    {sharedProperty.description}
                  </p>
                </div>
              </div>
              <div className="text-gray-800">
                <p className="mb-2">Property link</p>
                <div className="flex justify-between gap-2 items-center">
                  <input
                    className="py-2 px-2.5 w-full border rounded-lg text-gray-800 font-normal"
                    type="text"
                    value={sharedProperty.propertyLink}
                    readOnly
                  />
                  <button
                    className="py-2 px-4 border rounded-lg"
                    onClick={copyToClipboard}
                  >
                    Copy
                  </button>

                  {/* Copy success modal */}
                  {isCopySuccessModalOpen && (
                    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
                      <div className="bg-white p-4 rounded-lg">
                        <p>Link copied to clipboard!</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
