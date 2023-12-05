let sliderProviceContainer;
let sliderProvice;
let cards;

let elementsToShow = '';

if (typeof window !== "undefined") {
  // Code that uses the document object goes here

  if (window.innerWidth < 500) {
    elementsToShow = 2;
  } else if (window.innerWidth < 1000) {
    elementsToShow = 4;
  } else if (window.innerWidth < 1500) {
    elementsToShow = 6;
  }

  // Rest of the code goes here
}

function initSliderProvice() {
  sliderProviceContainer = document.getElementById("sliderProviceContainer");
  sliderProvice = document.getElementById("sliderProvice");
  cards = sliderProvice.getElementsByTagName("li");

  let sliderProviceContainerWidth = sliderProviceContainer.clientWidth;

  let cardWidth = sliderProviceContainerWidth / elementsToShow;

  sliderProvice.style.width = cards.length * cardWidth + "px";
  sliderProvice.style.transition = "margin";
  sliderProvice.style.transitionDuration = "0.3s";

  for (let index = 0; index < cards.length; index++) {
    const element = cards[index];
    element.style.width = cardWidth + "px";
  }
}

function prev() {
  let cardWidth = sliderProviceContainer.clientWidth / elementsToShow;

  let fixnum1 = +sliderProvice.style.marginLeft.slice(0, -2);
  let fixnum2 = -cardWidth * (cards.length - elementsToShow);

  if (fixnum1.toFixed(3) != fixnum2.toFixed(3))
    sliderProvice.style.marginLeft =
      +sliderProvice.style.marginLeft.slice(0, -2) - cardWidth + "px";
  // for console debug sliderProvice => 1 = 2.2
  console.log("1", +sliderProvice.style.marginLeft.slice(0, -2));
  console.log("2.1", +sliderProvice.style.marginLeft.slice(0, -2));
  // console.log('2.2', -cardWidth * (cards.length - elementsToShow));
  console.log("2.2", fixnum2.toFixed(3));
}

function next() {
  let cardWidth = sliderProviceContainer.clientWidth / elementsToShow;

  if (+sliderProvice.style.marginLeft.slice(0, -2) != 0)
    sliderProvice.style.marginLeft =
      +sliderProvice.style.marginLeft.slice(0, -2) + cardWidth + "px";
}

export { initSliderProvice, prev, next };
