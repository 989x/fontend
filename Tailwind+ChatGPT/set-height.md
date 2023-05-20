### In Tailwind, how to set height of a div to 80% of the screen?
- https://stackoverflow.com/questions/68725366/in-tailwind-how-to-set-height-of-a-div-to-80-of-the-screen

### question
I have an overflow div in y axis and want it to be exactly the 80% of the height of the screen. Now I have this <div class="overflow-y-auto h-96"> which works but the height must be bigger than 96, exactly 80% of the whole screen (to leave space for header and footer).

Using h-4/5 seems not to work.

### answer
You can do `h-[80vh]`, which would set the height to 80% of the screen height.