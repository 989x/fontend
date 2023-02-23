import { useEffect } from 'react';
import { initSlider, prev, next } from './func1';

export default function Home() {
  useEffect(() => {
    initSlider();
  }, []);

  return (
    <div>
      <div id="sliderContainer">
        <ul id="slider">
          <li><img src="image1.jpg" /></li>
          <li><img src="image2.jpg" /></li>
          <li><img src="image3.jpg" /></li>
          <li><img src="image4.jpg" /></li>
          <li><img src="image5.jpg" /></li>
          <li><img src="image6.jpg" /></li>
        </ul>
      </div>
      <button onClick={prev}>Prev</button>
      <button onClick={next}>Next</button>
    </div>
  );
}