let sliderBlogContainer;
let sliderBlog;
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

function initSliderBlog() {
  sliderBlogContainer = document.getElementById("sliderBlogContainer");
  sliderBlog = document.getElementById("sliderBlog");
  cards = sliderBlog.getElementsByTagName("li");

  let sliderBlogContainerWidth = sliderBlogContainer.clientWidth;

  let cardWidth = sliderBlogContainerWidth / elementsToShow;

  sliderBlog.style.width = cards.length * cardWidth + "px";
  sliderBlog.style.transition = "margin";
  sliderBlog.style.transitionDuration = "0.5s";

  for (let index = 0; index < cards.length; index++) {
    const element = cards[index];
    element.style.width = cardWidth + "px";
  }
}

function prev() {
  let cardWidth = sliderBlogContainer.clientWidth / elementsToShow;

  let fixnum1 = +sliderBlog.style.marginLeft.slice(0, -2);
  let fixnum2 = -cardWidth * (cards.length - elementsToShow);

  if (fixnum1.toFixed(3) != fixnum2.toFixed(3))
    sliderBlog.style.marginLeft =
      +sliderBlog.style.marginLeft.slice(0, -2) - cardWidth + "px";
  // for console debug sliderBlog => 1 = 2.2
  console.log("1", +sliderBlog.style.marginLeft.slice(0, -2));
  console.log("2.1", +sliderBlog.style.marginLeft.slice(0, -2));
  // console.log('2.2', -cardWidth * (cards.length - elementsToShow));
  console.log("2.2", fixnum2.toFixed(3));
}

function next() {
  let cardWidth = sliderBlogContainer.clientWidth / elementsToShow;

  if (+sliderBlog.style.marginLeft.slice(0, -2) != 0)
    sliderBlog.style.marginLeft =
      +sliderBlog.style.marginLeft.slice(0, -2) + cardWidth + "px";
}

export { initSliderBlog, prev, next };
