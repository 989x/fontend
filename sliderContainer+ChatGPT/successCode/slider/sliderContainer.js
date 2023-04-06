let sliderContainer;
let slider;
let cards;

let elementsToShow = '';

if (typeof window !== "undefined") {
  // Code that uses the document object goes here

  if (window.innerWidth < 500) {
    elementsToShow = 1;
  } else if (window.innerWidth < 1000) {
    elementsToShow = 2;
  } else if (window.innerWidth < 1500) {
    elementsToShow = 3;
  }

  // Rest of the code goes here
}

function initSlider() {
  sliderContainer = document.getElementById("sliderContainer");
  slider = document.getElementById("slider");
  cards = slider.getElementsByTagName("li");

  let sliderContainerWidth = sliderContainer.clientWidth;

  let cardWidth = sliderContainerWidth / elementsToShow;

  slider.style.width = cards.length * cardWidth + "px";
  slider.style.transition = "margin";
  slider.style.transitionDuration = "1s";

  for (let index = 0; index < cards.length; index++) {
    const element = cards[index];
    element.style.width = cardWidth + "px";
  }
}

function prev() {
  let cardWidth = sliderContainer.clientWidth / elementsToShow;

  let fixnum1 = +slider.style.marginLeft.slice(0, -2);
  let fixnum2 = -cardWidth * (cards.length - elementsToShow);

  if (fixnum1.toFixed(3) != fixnum2.toFixed(3))
    slider.style.marginLeft =
      +slider.style.marginLeft.slice(0, -2) - cardWidth + "px";
  // for console debug slider => 1 = 2.2
  console.log("1", +slider.style.marginLeft.slice(0, -2));
  console.log("2.1", +slider.style.marginLeft.slice(0, -2));
  // console.log('2.2', -cardWidth * (cards.length - elementsToShow));
  console.log("2.2", fixnum2.toFixed(3));
}

function next() {
  let cardWidth = sliderContainer.clientWidth / elementsToShow;

  if (+slider.style.marginLeft.slice(0, -2) != 0)
    slider.style.marginLeft =
      +slider.style.marginLeft.slice(0, -2) + cardWidth + "px";
}

export { initSlider, prev, next };
