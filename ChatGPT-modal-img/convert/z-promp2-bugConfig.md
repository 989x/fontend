### 🙎🏻‍♂️ 💬

'overlay' is possibly 'null'.ts(18047)

### ChatGPT

To fix the TypeScript error, you can add a type guard to check if the `overlay` element exists before manipulating its classList:

```ts
const openModal = (index: any) => {
  setSelectedImageIndex(index);
  const overlay = document.querySelector(".overlay");
  if (overlay) {
    overlay.classList.add("active");
  }
};

const closeModal = () => {
  setSelectedImageIndex(null);
  const overlay = document.querySelector(".overlay");
  if (overlay) {
    overlay.classList.remove("active");
  }
};
```

This should resolve the TypeScript error by checking if `overlay` is not null before accessing its `classList` property.

### 🙎🏻‍♂️ 💬

Argument of type 'null' is not assignable to parameter of type 'SetStateAction<number>'.ts(2345)

### ChatGPT

The `setSelectedImageIndex` function expects a value of type `SetStateAction<number>`, which means you cannot directly pass `null` to it. To fix this error, you can update the `selectedImageIndex` state to use the `nullish coalescing operator (??)` to default to `null` if no index is selected:

```ts
const [selectedImageIndex, setSelectedImageIndex] = useState<number>(null);

const openModal = (index: any) => {
  setSelectedImageIndex(index);
  const overlay = document.querySelector(".overlay");
  if (overlay) {
    overlay.classList.add("active");
  }
};

const closeModal = () => {
  setSelectedImageIndex(prevIndex => prevIndex ?? null);
  const overlay = document.querySelector(".overlay");
  if (overlay) {
    overlay.classList.remove("active");
  }
};
```

With this update, the initial state of `selectedImageIndex` will be `null`, and the `closeModal` function will update the state to `null` using the `nullish coalescing operator` if the previous state value is `undefined` or `null`.