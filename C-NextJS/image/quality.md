### Lower quality images in Next.js "Image" vs. normal "img" tag

stackoverflow: https://stackoverflow.com/questions/73673403/lower-quality-images-in-next-js-image-vs-normal-img-tag

Next.js creates versions of your image on run time and serves the apt sized image to render. 

If you want to opt out of it: 

1. You can selectively use the unoptimized prop:

```jsx
 <Image
    className="text-center"
    src={url}
    alt={alt}
    width={width}
    height={height}
unoptimized
  />
```

or,

2. Using the unoptimized option in next.config.js:

```jsx
module.exports = {
  images: {
    unoptimized: true,
  },
}
```

When above is set true images will be served as is, without any size change.
