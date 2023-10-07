import React, { useState, useEffect } from 'react';

function Pagination({ pages = 10, setCurrentPage }) {

  //Set number of pages
  const numberOfPages = []
  for (let i = 1; i <= pages; i++) {
    numberOfPages.push(i)
  }

  // Current active button number
  const [currentButton, setCurrentButton] = useState(1)

  // Array of buttons what we see on the page
  const [arrOfCurrButtons, setArrOfCurrButtons] = useState([])

  useEffect(() => {
    let tempNumberOfPages = [...arrOfCurrButtons]

    let dotsInitial = '...'
    let dotsLeft = '... '
    let dotsRight = ' ...'

    if (numberOfPages.length < 6) {
      tempNumberOfPages = numberOfPages
    }

    else if (currentButton >= 1 && currentButton <= 3) {
      tempNumberOfPages = [1, 2, 3, 4, dotsInitial, numberOfPages.length]
    }

    else if (currentButton === 4) {
      const sliced = numberOfPages.slice(0, 5)
      tempNumberOfPages = [...sliced, dotsInitial, numberOfPages.length]
    }

    else if (currentButton > 4 && currentButton < numberOfPages.length - 2) {               // from 5 to 8 -> (10 - 2)
      const sliced1 = numberOfPages.slice(currentButton - 2, currentButton)                 // sliced1 (5-2, 5) -> [4,5] 
      const sliced2 = numberOfPages.slice(currentButton, currentButton + 1)                 // sliced1 (5, 5+1) -> [6]
      tempNumberOfPages = ([1, dotsLeft, ...sliced1, ...sliced2, dotsRight, numberOfPages.length]) // [1, '...', 4, 5, 6, '...', 10]
    }
    
    else if (currentButton > numberOfPages.length - 3) {                 // > 7
      const sliced = numberOfPages.slice(numberOfPages.length - 4)       // slice(10-4) 
      tempNumberOfPages = ([1, dotsLeft, ...sliced])                        
    }
    
    else if (currentButton === dotsInitial) {
      // [1, 2, 3, 4, "...", 10].length = 6 - 3  = 3 
      // arrOfCurrButtons[3] = 4 + 1 = 5
      // or 
      // [1, 2, 3, 4, 5, "...", 10].length = 7 - 3 = 4
      // [1, 2, 3, 4, 5, "...", 10][4] = 5 + 1 = 6
      setCurrentButton(arrOfCurrButtons[arrOfCurrButtons.length-3] + 1) 
    }
    else if (currentButton === dotsRight) {
      setCurrentButton(arrOfCurrButtons[3] + 2)
    }

    else if (currentButton === dotsLeft) {
      setCurrentButton(arrOfCurrButtons[3] - 2)
    }

    setArrOfCurrButtons(tempNumberOfPages)
    setCurrentPage(currentButton)
  }, [currentButton])

  return (
    <div className="en2 mt-16 flex justify-center gap-1.5 text-lg font-bold text-gray-600">
      <a 
        href="#" 
        className={`${currentButton === 1 ? 'inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-200' : 'inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300'}`}
        onClick={() => setCurrentButton(prev => prev <= 1 ? prev : prev - 1)}
      >
        <span className="sr-only">Prev Page</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
        <path
          fillRule="evenodd"
          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
          clipRule="evenodd"
        />
        </svg>
      </a>

      {arrOfCurrButtons.map(((item, index) => {
        return <a
          href="#"
          key={index}
          className={`${currentButton === item ? 'block h-10 w-10 rounded-lg border-blue-600 bg-blue-600 text-center p-1 leading-8 text-white' : 'block h-10 w-10 rounded-lg border border-gray-300 text-center p-1 leading-8'}`}
          onClick={() => setCurrentButton(item)}
        >
          {item}
        </a>
      }))}

      <a
        href="#"
        className={`${currentButton === numberOfPages.length ? 'inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-200' : 'inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300'}`}
        onClick={() => setCurrentButton(prev => prev >= numberOfPages.length ? prev : prev + 1)}
      >
        <span className="sr-only">Next Page</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
          fillRule="evenodd"
          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
          clipRule="evenodd"
          />
        </svg>
      </a>
    </div>
  );
}

export default Pagination