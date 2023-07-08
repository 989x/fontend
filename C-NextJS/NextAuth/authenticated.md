### No Router Instance
There was a problem when the system was checking the user's session value, If session = null or no value, go to login page.

```bash
Error: No router instance found. you should only use "next/router" inside the client side of your app. https://nextjs.org/docs/messages/no-router-instance
    at noRouter (/Users/zxc/Desktop/github/land-front/landda/node_modules/.pnpm/next@13.2.1_biqbaboplfbrettd7655fr4n2y/node_modules/next/dist/server/render.js:57:11)
    at ServerRouter.push (/Users/zxc/Desktop/github/land-front/landda/node_modules/.pnpm/next@13.2.1_biqbaboplfbrettd7655fr4n2y/node_modules/next/dist/server/render.js:81:9)
    at Hosting (webpack-internal:///./pages/hosting/index.tsx:56:16)
    at renderWithHooks (/Users/zxc/Desktop/github/land-front/landda/no
```

Why This Error Occurred 
- https://nextjs.org/docs/messages/no-router-instance

During Pre-rendering (SSR or SSG) you tried to access a router method `push`, `replace`, `back`, which is not supported.

</br>

### How to fix

from

```ts
  // authenticated session
  const router = useRouter();
  const { data: session } = useSession();

  if (!session) {
    // Redirect to the signin page
    router.push('/auth/signin');
    return null;
  }
```

change to

```ts
  useEffect(() => {
    if (!session) {
      // Redirect to the signin page
      router.push('/auth/signin');
    }
  }, [session, router]);
```