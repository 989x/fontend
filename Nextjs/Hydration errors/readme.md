### Hydration errors - Text content does not match server-rendered HTML. #38263
- github: https://github.com/vercel/next.js/discussions/38263


### Solve
```
Hi,

Yeah so this two errors are combined.

Because the client, on the first frame, needs to see the same HTML as the server sent over, in order to place event listeners and place siblings and children correctly, if there's an error while this is being done, React logs an error. This has happened all the way back to React 17 AFAIK.

Problem number 2 kicks in with the new rendering root, which sees this as a rendering error, which is unfriendly to concurrent features, so hydration fails and it throws the entire thing out the window.

At least that's how I interpret the second error. Lots of people just ignored error number 1, during the entire 2 years React 17 was out, not saying you did, but many use libraries that did, and others just ignored them.
```