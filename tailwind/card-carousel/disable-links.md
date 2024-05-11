### Ask

In this code, we want to disable links in the handleNext and handlePrev buttons.

<done.tsx />

### ChatGPT

To disable the links in the `handleNext` and `handlePrev` buttons, you can add conditional logic to prevent the link from being followed when those buttons are clicked. Here's how you can modify your code to achieve this:

<done.tsx />

In this code, we've added an `onClickCapture` event handler to both the "prev" and "next" buttons. This handler calls `disableLink`, which prevents the default link behavior by calling `event.preventDefault()`. This way, clicking the "prev" and "next" buttons won't trigger the link navigation.
