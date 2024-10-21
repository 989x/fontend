### Ask

has either width or height modified, but not the other. 
If you use CSS to change the size of your image, also include the styles 'width: "auto"' or 'height: "auto"' to maintain the aspect ratio.

```js
<Image
  src={`/image/property/facilities/${facility}.svg`}
  alt="facilities"
  width="18"
  height="18"
/>
```

### ChatGPT

The warning message you're receiving suggests that the aspect ratio of the image might not be maintained when resizing. To ensure that the aspect ratio is maintained, you can add the styles 'width: "auto"' or 'height: "auto"' in the `style` attribute of the `Image` component.

Here's how you can modify the `Image` component in your code:

```js
// ... (other imports and component code)

<Image
  src={`/image/property/facilities/${facility}.svg`}
  alt="facilities"
  width="18"
  height="18"
  style={{ width: "auto", height: "auto" }}
/>

// ... (other component code)
```

This change will help maintain the aspect ratio when resizing the image. The `width: "auto"` and `height: "auto"` styles allow the image to adjust its size while preserving the original aspect ratio.

Make sure to apply this modification wherever you use the `Image` component in your project, especially when you're dynamically adjusting the size of the images.
