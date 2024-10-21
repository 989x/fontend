## example from github



### way 1

How can I attach my JWT to every axios call? #3550
- https://github.com/nextauthjs/next-auth/discussions/3550

`useSession()` can only be used for client side. `getSession` is used for client and server side.

You can make the code you have use `async/await`:

```js
async (response) => {
      const session = await getSession();
      if (session) {
        request.headers.Authorization = `Bearer ${session.accessToken}`;
      }
      return response;
    },
```



### way 2

Ahhh!! The answer seems to be deleted. Anyways I would share my approach based on that answer -

```js
import axios, { AxiosRequestConfig } from 'axios';
import { getSession } from 'next-auth/react';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL,
});

axiosInstance.interceptors.request.use(async (request) => {
  if (!isAccessTokenAttachedToAxiosDefaults())
    await setAccessTokenOnRequestAndAsAxiosDefaults(request);
  return request;
});

const isAccessTokenAttachedToAxiosDefaults = () => {
  const authHeader = axiosInstance.defaults.headers.common['Authorization'];
  if (authHeader === null || authHeader === undefined || authHeader === '')
    return false;
  else return true;
};

const setAccessTokenOnRequestAndAsAxiosDefaults = async (
  request: AxiosRequestConfig
) => {
  const session = await getSession();
  if (session) {
    const AuthHeaderValue = `Bearer ${session.accessToken}`;
    if (!request.headers) request.headers = {};
    request.headers.Authorization = AuthHeaderValue;

    axiosInstance.defaults.headers.common['Authorization'] =
      AuthHeaderValue; /* NOTE - This is to prevent calling getSession() again and again for each request. 
                                  Because getSession() internally calls api/auth/session, which would be very expensive to do
                                  for each request to our backend [Call to this API was consuming around 10% of our bandwidth provided to us by vercel]. 
                                  
                                  It will not only lead to increase in costs but also increase time to perform each request as 
                                  we have to every-time make a remote call to /api/auth/session. */
  }
};

export const unsetAccessTokenAttachedToAxiosDefaults = () => {
  delete axiosInstance.defaults.headers.common['Authorization'];
};
```

NOTE - Don't forget to call the unsetAccessTokenAttachedToAxiosDefaults() along with your sign-out logic!!! I tripped at it and it was producing a very bad and subtle bug.



### way 3

I'm doing what @pvandamme showed, thank you for that.
But instead of SessionLoader, I'm wrapping `useSession` like this:

```js
export const useAuth = () => {
  const { data, status } = useSession();

  if (status !== "loading") {
      if (status === "authenticated") {
        setAuthToken(data.accessToken);
      } else if (status === "unauthenticated") {
        setAuthToken("");
      }
    }

  return {
    session: data,
    loading: status === "loading",
    isAuthenticated: status === "authenticated",
  };
};
```

Also setting my token like this:

```js
const setAuthToken = (token) => {
  if (!!token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
};
```