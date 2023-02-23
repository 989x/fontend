import React, { useState, useEffect } from "react";

{/* ____________________ dev ____________________ */}

let sliderContainer = document.getElementById('sliderContainer');
let slider = document.getElementById('slider');
let cards = slider.getElementsByTagName('li');

let elementsToShow = 3;
if (document.body.clientWidth<1000) {
  elementsToShow = 1;
} else if (document.body.clientWidth<1500) {
  elementsToShow = 2;
}

let sliderContainerWidth = sliderContainer.clientWidth;

let cardWidth = sliderContainerWidth/elementsToShow;

slider.style.width = cards.length*cardWidth+'px';
slider.style.transition='margin';
slider.style.transitionDuration='1s';

for (let index = 0; index < cards.length; index++) {
    const element = cards[index];
    element.style.width = cardWidth+'px'
}

function prev(){
  console.log(+slider.style.marginLeft.slice(0, -2))
  console.log(cardWidth*(cards.length-elementsToShow));
  
  // if (+slider.style.marginLeft.slice(0, -2) != -cardWidth * (cards.length - elementsToShow))
  if (+slider.style.marginLeft.slice(0, -2) != -cardWidth * (cards.length - elementsToShow))
    slider.style.marginLeft = ((+slider.style.marginLeft.slice(0, -2)) - cardWidth) + 'px'; // 100px
}

function next(){
  if (+slider.style.marginLeft.slice(0, -2) != 0)
    slider.style.marginLeft = ((+slider.style.marginLeft.slice(0, -2)) + cardWidth) + 'px'; // 100px
}

{/* ____________________ dev ____________________ */}

const SupportBanner = () => {

  return (
    <div>

      {/* ____________________ dev ____________________ */}

      <div className="flex">

        <div className="w-2/12 flex items-center">
          <div className="w-full text-right">
            <button onClick={prev} className="p-3 rounded-full bg-white border border-gray-100 shadow-lg mr-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
                />
              </svg>
            </button>
          </div>
        </div>

        <div id="sliderContainer" className="w-10/12 overflow-hidden">
          <ul id="slider" className="flex w-full">
            <li className="p-5">
              <div className="border rounded-lg p-5">
                <img className="h-50 w-full object-cover rounded-md" src="https://assets.brandinside.asia/uploads/2021/09/ttb-Make-REAL-Change.jpg" alt="" />
                <h2 className="en1 mt-2 text-2xl font-bold text-gray-700">Lorem ipsum dolor sit amet</h2>
                <p className="mt-2 text-gray-500">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                </p>
                <button className="mt-4 px-6 py-3 rounded-md bg-green-700 text-white font-bold">Read More</button>
              </div>
            </li>
            <li className="p-5">
              <div className="border rounded-lg p-5">
                <img className="h-50 w-full object-cover rounded-md" src="https://api.livinginsider.com/upload/banner/20230127_Project%20MSIG_800x447.jpg" alt="" />
                <h2 className="en1 mt-2 text-2xl font-bold text-gray-700">Lorem ipsum dolor sit amet</h2>
                <p className="mt-2 text-gray-500">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                </p>
                <button className="mt-4 px-6 py-3 rounded-md bg-green-700 text-white font-bold">Read More</button>
              </div>
            </li>
            <li className="p-5">
              <div className="border rounded-lg p-5">
                <img className="h-50 w-full object-cover rounded-md" src="https://assets.brandinside.asia/uploads/2021/09/ttb-Make-REAL-Change.jpg" alt="" />
                <h2 className="en1 mt-2 text-2xl font-bold text-gray-700">Lorem ipsum dolor sit amet</h2>
                <p className="mt-2 text-gray-500">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                </p>
                <button className="mt-4 px-6 py-3 rounded-md bg-green-700 text-white font-bold">Read More</button>
              </div>
            </li>
            <li className="p-5">
              <div className="border rounded-lg p-5">
                <img className="h-50 w-full object-cover rounded-md" src="https://api.livinginsider.com/upload/banner/20230127_Project%20MSIG_800x447.jpg" alt="" />
                <h2 className="en1 mt-2 text-2xl font-bold text-gray-700">Lorem ipsum dolor sit amet</h2>
                <p className="mt-2 text-gray-500">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                </p>
                <button className="mt-4 px-6 py-3 rounded-md bg-green-700 text-white font-bold">Read More</button>
              </div>
            </li>
            <li className="p-5">
              <div className="border rounded-lg p-5">
                <img className="h-50 w-full object-cover rounded-md" src="https://assets.brandinside.asia/uploads/2021/09/ttb-Make-REAL-Change.jpg" alt="" />
                <h2 className="en1 mt-2 text-2xl font-bold text-gray-700">Lorem ipsum dolor sit amet</h2>
                <p className="mt-2 text-gray-500">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                </p>
                <button className="mt-4 px-6 py-3 rounded-md bg-green-700 text-white font-bold">Read More</button>
              </div>
            </li>
          </ul>
        </div>

        <div className="w-2/12 flex items-center">
          <div className="w-full">
            <button onClick={next} className="p-3 rounded-full bg-white border border-gray-100 shadow-lg ml-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                />
              </svg>
            </button>
          </div>
        </div>

      </div>

      {/* ____________________ dev ____________________ */}

    </div>
  );
};

export default SupportBanner;
