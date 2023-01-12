### Migrating to React Query 4
- https://tanstack.com/query/v4/docs/react/guides/migrating-to-react-query-4#onsuccess-is-no-longer-called-from-setquerydata

### Query Filters

`onSuccess` is no longer called from `setQueryData`
This was confusing to many and also created infinite loops if `setQueryData` was called from within `onSuccess`. It was also a frequent source of error when combined with `staleTime`, because if data was read from the cache only, `onSuccess` was not called.

Similar to `onError` and `onSettled`, the `onSuccess` callback is now tied to a request being made. No request -> no callback.

If you want to listen to changes of the `data` field, you can best do this with a `useEffect`, where `data` is part of the dependency Array. Since React Query ensures stable data through structural sharing, the effect will not execute with every background refetch, but only if something within data has changed:

```ts
const { data } = useQuery({ queryKey, queryFn })
React.useEffect(() => mySideEffectHere(data), [data])
```

### include

```ts
useEffect(() => {
  setPosts(data?.books), [data?.books]
})
```