let sliderAdsContainer;
let sliderAds;
let cards;

if (typeof window !== 'undefined') {
    // Code that uses the document object goes here
    let elementsToShow = 3;

    if (window.innerWidth < 500) {
      elementsToShow = 1;
    } 
    else if (window.innerWidth < 1000) {
      elementsToShow = 2;
    }
    else if (window.innerWidth < 1500) {
      elementsToShow = 3;
    }

    // Rest of the code goes here
  }

function initSliderAds() {
  sliderAdsContainer = document.getElementById('sliderAdsContainer');
  sliderAds = document.getElementById('sliderAds');
  cards = sliderAds.getElementsByTagName('li');

  let sliderAdsContainerWidth = sliderAdsContainer.clientWidth;

  let cardWidth = sliderAdsContainerWidth / elementsToShow;

  sliderAds.style.width = cards.length * cardWidth + 'px';
  sliderAds.style.transition = 'margin';
  sliderAds.style.transitionDuration = '1s';

  for (let index = 0; index < cards.length; index++) {
    const element = cards[index];
    element.style.width = cardWidth + 'px';
  }
}

function prev() {
  let cardWidth = sliderAdsContainer.clientWidth / elementsToShow;

  let fixnum1 = +sliderAds.style.marginLeft.slice(0, -2)
  let fixnum2 = -cardWidth * (cards.length - elementsToShow)

  if (fixnum1.toFixed(3) != fixnum2.toFixed(3))
    sliderAds.style.marginLeft = ((+sliderAds.style.marginLeft.slice(0, -2)) - cardWidth) + 'px';
    // for console debug sliderAds => 1 = 2.2
    // console.log('1', +sliderAds.style.marginLeft.slice(0, -2))
    // console.log('2.1', +sliderAds.style.marginLeft.slice(0, -2));

    // console.log('2.2', -cardWidth * (cards.length - elementsToShow));
    // new
    // console.log('2.2', fixnum2.toFixed(3));

}

function next() {
  let cardWidth = sliderAdsContainer.clientWidth / elementsToShow;

  if (+sliderAds.style.marginLeft.slice(0, -2) != 0)
    sliderAds.style.marginLeft = ((+sliderAds.style.marginLeft.slice(0, -2)) + cardWidth) + 'px';
}

export { initSliderAds, prev, next };
