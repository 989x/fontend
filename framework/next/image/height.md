### How to set the next/image component to 100% height

stackoverflow: https://stackoverflow.com/questions/65169431/how-to-set-the-next-image-component-to-100-height

`In 2023`, every above solution is deprecated,

use below

```jsx
<Image
  src="url"
  width={0}
  height={0}
  sizes="100vw"
  style={{ width: '100%', height: 'auto' }} // optional
/>
```

Github: https://github.com/vercel/next.js/discussions/18474#discussioncomment-5501724