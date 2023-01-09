### 4 Quick Fixes for the “Cannot Read Property ‘length’ of Undefined” Error in JavaScript
- web: https://codingbeautydev.com/blog/javascript-cannot-read-property-length-of-undefined/

4. Use a Fallback Value Instead of Accessing the length Property
We can also combine the optional chaining operator (?.) and the nullish coalescing operator (??) to provide a fallback value to use as the result, instead of accessing the length property from the undefined value.

```ts
const arr = undefined;

// Using "0" as a fallback value
const arrLength = arr?.length ?? 0;

console.log(arrLength); // 0


const str = undefined;

// Using "0" as a fallback value
const strLength = str?.length ?? 0;

console.log(strLength); // 0
```

As we saw earlier, the logical OR operator (||) can replace the ?? operator in cases like this:

```ts
const arr = undefined;

// Using "0" as a fallback value
const arrLength = arr?.length || 0;

console.log(arrLength); // 0

const str = undefined;

// Using "0" as a fallback value
const strLength = str?.length || 0;

console.log(strLength); // 0
```