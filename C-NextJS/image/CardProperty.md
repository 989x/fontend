> has either width or height modified, but not the other. If you use CSS to change the size of your image, also include the styles 'width: "auto"' or 'height: "auto"' to maintain the aspect ratio.

### NextJS Image component with fixed witdth and auto height

- stackoverflow: https://stackoverflow.com/questions/69230343/nextjs-image-component-with-fixed-witdth-and-auto-height

From Next.js 13, the `next/image` component allows styling the underlying image directly using `style`/`className`. This means you can apply `width: 100%` and `height: auto` on the `Image` component directly.

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

### Example

```js
<Image
    src={estateData.desc.images[currentImageIndex]}
    alt={`${estateData.desc.title}+${estateData.desc.images[0]}`}
    width={400}
    height={0}
    style={{ width: "100%", height: "100%", objectFit: "cover" }}
/> 

// change to 

<Image
    src={estateData.desc.images[currentImageIndex]}
    alt={`${estateData.desc.title}+${estateData.desc.images[0]}`}
    width="0"
    height="0"
    sizes="100vw"
    quality={60}
    className="w-full h-auto"
/>
```