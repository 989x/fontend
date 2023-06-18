### NextJS Image component with fixed witdth and auto height
- https://stackoverflow.com/questions/69230343/nextjs-image-component-with-fixed-witdth-and-auto-height

From Next.js 13, the `next/image` component allows styling the underlying image directly using `style/className`. This means you can apply `width: 100%` and `height: auto` on the Image component directly.
```js
import Image from 'next/image';

<Image
    src={img1}
    width="0"
    height="0"
    sizes="100vw"
    style={{ width: '100%', height: 'auto' }}
/>
```

Or, if using Tailwind CSS.
```js
import Image from 'next/image';

<Image
    src={img1}
    width="0"
    height="0"
    sizes="100vw"
    className="w-full h-auto"
/>
```

Before Next.js 13, the above feature is only available through `next/future/image`, and from version 12.2, `next/future/image` was still experimental and can be enabled in `next.config.js` under the `experimental` flag.
```
module.exports = {
    experimental: {
        images: {
            allowFutureImage: true
        }
    },
    // Other configs
}
```