import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useDictionary } from "@/lib/dictionary";

// using nextJS typescript tailwindcss
// I want the picture to be able to move to the next picture. There will be left-right scrolling buttons on the picture.
// I've added prev and next buttons. You just need to add the conditions.

// OK, the code can work fine. But I want to add conditions to the prev and next buttons.
// If you are in the first picture you cannot press the prev button and if you are in the last picture you cannot press the next button.
// and will change from bg-white to bg-gray-200

const CardProperty = ({ data }: any) => {
  const t = useDictionary();

  // Initialize state for the current image index
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const totalImages = data.desc.images.length;

  const maxVisibleCircles = 5; // Set the maximum number of visible circles

  // Function to handle the next button click
  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % totalImages);
  };

  // Function to handle the prev button click
  const handlePrev = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + totalImages) % totalImages
    );
  };

  const isAtFirstImage = currentImageIndex === 0;
  const isAtLastImage = currentImageIndex === totalImages - 1;

  // Calculate start and end indices for visible circles
  let startCircleIndex = Math.max(
    0,
    Math.min(
      totalImages - maxVisibleCircles,

      // when selecting the third image, but not the final position, the third position should be in the center.
      // isAtLastImage ? totalImages - maxVisibleCircles : currentImageIndex
      
      // adjust the code to ensure that when selecting a circle, it is centered when it is not at the beginning or end
      isAtLastImage ? totalImages - maxVisibleCircles : currentImageIndex - 2
    )
  );

  // Function to disable links
  const disableLink = (event: any) => {
    event.preventDefault();
  };

  return (
    <div className="w-full" title={data.desc.title}>
      {/* <Link href={`/property/${data.head.estateID}`}> */}
        <div className="shadow rounded-md">

          {/* I added <div className="w-[10px] h-[10px] bg-white rounded-full"> to the image and this div has a circle value. */}

          {/* Set the number of circles to be equal to the total number of images. */}

          <div className="flex justify-center relative rounded-t-md overflow-hidden h-[260px] lg:h-[280px]">
            <Image
              className="object-full"
              // src={data.desc.images[0]}
              src={data.desc.images[currentImageIndex]}
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
              <button
                className={`w-9 h-9 rounded-full ${
                  isAtFirstImage ? 'bg-gray-200 cursor-not-allowed' : 'bg-white'
                }`}
                onClick={handlePrev}
                disabled={isAtFirstImage}
                onClickCapture={disableLink} // Disable link click
              >
                prev
              </button>
              <button
                className={`w-9 h-9 rounded-full ${
                  isAtLastImage ? 'bg-gray-200 cursor-not-allowed' : 'bg-white'
                }`}
                onClick={handleNext}
                disabled={isAtLastImage}
                onClickCapture={disableLink} // Disable link click
              >
                next
              </button>
            </div>

            {/* 
              I would like to increase the condition so that only 5 can be displayed at most.
              The 6th one will appear when scrolling through the image. and will continue to slide
            */}
            
            {/* Render circles based on the total number of images */}
            <div className="absolute bottom-2 flex gap-1">
              {Array.from(
                { length: Math.min(maxVisibleCircles, totalImages) },
                (_, index) => (
                  <div
                    key={startCircleIndex + index}
                    className={`w-2 h-2 bg-white rounded-full ${
                      startCircleIndex + index === currentImageIndex
                        ? 'opacity-100'
                        : 'opacity-50'
                    }`}
                  ></div>
                )
              )}
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
      {/* </Link> */}
    </div>
  );
};

export default CardProperty;
